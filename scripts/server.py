from flask import Flask, request

from audio_analyzer import AudioAnalyzer

app = Flask(__name__)


@app.route("/api/uploadtranscript", methods=["POST"])
def upload_transcript():
    transcript = request.json

    audio_analyzer = AudioAnalyzer(transcript)

    return audio_analyzer.retrieve_frequency_map()


if __name__ == '__main__':
    app.run(debug=True)
