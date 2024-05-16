import numpy as np
import pandas as pd


extra_data = pd.read_csv("games.csv")

extra_data[['year', 'month', 'day']] = extra_data['date_release'].str.split('-', expand=True)
extra_data['year'] = extra_data['year'].astype(int)

extra_data=extra_data.drop(columns=['steam_deck','discount','price_original','date_release','day'])

month_names = {
    '01': 'January', '02': 'February', '03': 'March', '04': 'April',
    '05': 'May', '06': 'June', '07': 'July', '08': 'August',
    '09': 'September', '10': 'October', '11': 'November', '12': 'December'
}

extra_data['month'] = extra_data['month'].map(month_names)

extra_data = extra_data[extra_data['year'] > 2011]

print(extra_data)

extra_data.to_csv('finished_games_data.csv')