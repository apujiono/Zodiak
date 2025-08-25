import logging

logging.basicConfig(filename="app.log", level=logging.ERROR)

def log_error(e):
    logging.error(f"Error: {str(e)}")