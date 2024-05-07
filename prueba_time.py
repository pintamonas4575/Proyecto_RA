import time
from datetime import datetime

ahora = int(time.time())

horario = datetime.fromtimestamp(ahora)
print(horario)
print(type(horario))
