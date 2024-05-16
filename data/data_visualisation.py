import numpy as np
import pandas as pd

import matplotlib as mpl
import matplotlib.pyplot as plt

import seaborn as sns
import seaborn.objects as so

data = pd.read_csv("finished_games_data.csv")


avg_count_data = data.groupby('year').size().reset_index(name='Count')
# Won't be taken
"""
sns.lineplot(x='release_year', y='Count', data=avg_count_data,marker='o',markersize=10,markerfacecolor='lightblue')
plt.xlabel('Year')
plt.ylabel('Released games')
plt.show()
"""
# ---------------------------------------------- Histplot of release games over 2-year Intervals ---------------------------------------------- #

sns.histplot(data=data,x='year')
plt.xlabel('Year')
plt.ylabel('Released games')
plt.show()

# ---------------------------------------------- Boxplot of Release prices over 5-year Intervals ---------------------------------------------- #

# Doesn't work as intended so it will not be implemented
avg = data.groupby('rating').size().reset_index(name='count')

sns.barplot(data=avg,y='rating',x='count')
plt.show()

# ---------------------------------------------- Lineplot of average release prices over years ---------------------------------------------- #

sns.lineplot(data=data,x='year',y='price_final',marker='o',markersize=10,markerfacecolor='lightblue')
plt.xlabel('Year')
plt.ylabel('Mean release price')
plt.show()

# ---------------------------------------------- Histplot of  release price over years ---------------------------------------------- #
# Won't be taken
"""
sns.histplot(data=data,x='release_year',y='release_price',binwidth=2,cbar=True, cbar_kws=dict(shrink=.75))
plt.xlabel('Year')
plt.ylabel('release price')
plt.show()
"""
# ---------------------------------------------- Heatmap ---------------------------------------------- #
# There isn't any correlation between data
"""
columns_to_correlate = ['positive_ratio','user_reviews','price_final','year']

correlation_matrix = data[columns_to_correlate].corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt=".2f", square=True)
plt.title('Correlation Matrix')
plt.show()
"""

"""
sns.histplot(data=data,x='year',y='price_final',binwidth=1)
plt.xlabel('Year')
plt.show()
"""
