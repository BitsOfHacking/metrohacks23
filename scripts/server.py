from flask import Flask, request, jsonify
from flask_cors import CORS
import g4f

from audio_analyzer import AudioAnalyzer
from transcript_analyzer import TranscriptAnalyzer

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/api/uploadtranscript", methods=["POST"])
def upload_transcript():
    transcript = request.json

    transcript_analyzer = TranscriptAnalyzer(transcript)
    return transcript_analyzer.retrieve_frequency_map()


@app.route('/api/uploadfile', methods=["POST"])
def upload_file():
    print(request)
    file = request.files['file']

    audio_analyzer = AudioAnalyzer(file)

    return audio_analyzer.find_pauses()


@app.route("/api/ask", methods=["POST"])
def ask():
    prompt = "Ask a question related to this: "
    transcript = request.json
    section = transcript["section"]

    g4f.logging = True  # enable logging
    g4f.check_version = False  # Disable automatic version checking

    # normal response
    res = g4f.ChatCompletion.create(
        model=g4f.models.gpt_4,
        messages=[{"role": "user", "content": prompt + section}],
    )  # alterative model setting
    return jsonify({
        "question": res
    })


if __name__ == '__main__':
    app.run(debug=True)
