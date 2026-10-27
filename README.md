# AudioWeb — Django Audio Player

AudioWeb is a browser-based audio player built with **Python, Django, HTML, CSS, and JavaScript**. I built it to practise connecting a JavaScript audio-player interface to a Django backend that stores and serves audio files.

## Screenshot

![AudioWeb player interface](https://raw.githubusercontent.com/JosueEtta/Atabe-potfolio/main/images/audioapp.png)

## Features

- Browse the audio tracks stored in the application.
- Play, pause, and navigate between tracks with the custom player controls.
- View track duration and album artwork when available.
- Mark tracks as favourites and view the favourites list.
- Upload audio files through the web interface.
- Upload or update artwork for a track.
- Retrieve song and favourites data through Django JSON endpoints.
- Responsive player interface with a track-list panel.

## Built with

- **Backend:** Python, Django
- **Frontend:** HTML, CSS, JavaScript, JavaScript Audio API
- **Audio metadata:** Mutagen
- **Image handling:** Pillow
- **Database:** Django's configured database (SQLite by default in a standard local setup)

## Requirements

- Python 3.10 or newer recommended
- pip
- Git

The dependencies currently pinned by the project are listed in `requirements.txt` at the repository root.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/JosueEtta/audioweb.git
cd audioweb
```

### 2. Create and activate a virtual environment

**Ubuntu / Linux / macOS**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

**Windows PowerShell**

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

The Django project is inside the `audioapp/` directory, while `requirements.txt` is in the repository root. Run:

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Move into the Django project directory

```bash
cd audioapp
```

### 5. Apply database migrations

```bash
python manage.py migrate
```

### 6. Start the development server

```bash
python manage.py runserver
```

Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in your browser.

Stop the server with `Ctrl+C`.

## Project structure

```text
audioweb/
├── requirements.txt
├── DESIGN.md
└── audioapp/
    ├── manage.py
    ├── audioapp/       # Django project settings and URL configuration
    └── app/
        ├── migrations/
        ├── models.py   # Song model
        ├── views.py    # Player pages and JSON endpoints
        ├── urls.py
        ├── template/
        └── static/
```

## Notes

- Uploaded audio and image files are stored through Django's media-file configuration. Use the app's upload interface to add tracks.
- This is a development setup. Before deploying publicly, configure production settings, media storage, security settings, and a production-ready web server.
- Only upload audio files you have the right to use.

## Author

**Atabe Sikadi Josue Etta**

- GitHub: [@JosueEtta](https://github.com/JosueEtta)
- Repository: [github.com/JosueEtta/audioweb](https://github.com/JosueEtta/audioweb)
