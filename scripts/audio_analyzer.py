from os import path
import json
import string
import numpy as np

JSON_FILE_PATH = "sample_data.json"


def strip_string(raw_string: str) -> str:
    # Remove punctuation
    raw_string = raw_string.translate(str.maketrans(dict.fromkeys(string.punctuation)))

    # Remove case sensitivity
    raw_string = raw_string.lower()

    return raw_string


class AudioAnalyzer:
    def __init__(self, transcript):
        self.transcript = transcript

    def retrieve_frequency_map(self):
        frequency_map = {}

        for key, value in self.transcript.items():
            stripped = strip_string(value)

            for word in stripped.split(" "):
                if word in frequency_map:
                    frequency_map[word] += 1
                else:
                    frequency_map[word] = 1

        return frequency_map