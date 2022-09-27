FROM python:3.9-buster
WORKDIR /backend
ADD . /backend
RUN pip install -r requirements.txt

EXPOSE 7140
CMD ["python", "run.py"]
