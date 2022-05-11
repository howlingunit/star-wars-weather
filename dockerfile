FROM python:buster
COPY . /app
WORKDIR /app
RUN apt update && apt get sense-hat && reboot now

RUN pip install -r requirements.txt 
EXPOSE 80
ENTRYPOINT [ "python" ] 
CMD [ "app.py" ]