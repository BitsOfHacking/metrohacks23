import io
import subprocess

import ffmpeg

SILENCE_THRESHOLD = 50
SILENCE_DURATION = 0.5


def parse_data(s):
    split = s.split(" ")

    return split[4] + " | " + split[7]

class AudioAnalyzer:
    def __init__(self, file):
        self.file = file

    def find_pauses(self):
        command = "ffmpeg -hide_banner -vn -i - -af \"silencedetect=n={}dB:d={}\" -f null -".format(SILENCE_THRESHOLD,
                                                                                                    SILENCE_DURATION)

        # command = ['ffmpeg', '-y', '-i', '-', '-f', 'wav', '-']

        memfile = io.BytesIO()
        memfile.write(self.file.read())
        memfile.seek(0)

        process = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        # subprocess pipe data gets routed to only stderr despite finishing perfectly
        # WHY does ffmpeg not document this?
        r, result = process.communicate(memfile.read())

        result = result.decode()

        print(result)

        # Parse result

        result = list(filter(lambda s: "silence_end" in s, result.replace("\r", "").split("\n")))

        result = list(map(lambda s: parse_data(s), result))

        print(result)

        return result
