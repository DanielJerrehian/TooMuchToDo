from src.app import create_app


if __name__ == "__main__":
    app = create_app(environment="production")
    app.run(host="0.0.0.0", port=7140)