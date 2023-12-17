from flask import Flask, request

from audio_analyzer import AudioAnalyzer
from transcript_analyzer import TranscriptAnalyzer

app = Flask(__name__)


@app.route("/api/uploadtranscript", methods=["POST"])
def upload_transcript():
    transcript = request.json

    transcript_analyzer = TranscriptAnalyzer(transcript)

    return transcript_analyzer.retrieve_frequency_map()


@app.route('/api/uploadfile', methods=["POST"])
def upload_file():
    file = request.files['file']

    audio_analyzer = AudioAnalyzer(file)

    return audio_analyzer.find_pauses()




if __name__ == '__main__':
    app.run(debug=True)
