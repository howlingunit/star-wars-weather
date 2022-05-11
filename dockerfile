FROM python:buster
COPY . /app
WORKDIR /app
RUN apt update && apt install sense-hat

RUN pip install -r requirements.txt 
EXPOSE 80
ENTRYPOINT [ "python" ] 
CMD [ "app.py" ]