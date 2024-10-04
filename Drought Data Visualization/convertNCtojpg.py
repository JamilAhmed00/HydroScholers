import os
import numpy as np
import matplotlib.pyplot as plt
from netCDF4 import Dataset

# Function to convert .nc data to .png for each month
def convert_nc_to_png(nc_file, output_folder, variable_name, cmap='RdYlBu_r'):
    # Open the .nc file
    dataset = Dataset(nc_file)

    # Extract variables (e.g., time, lat, lon, and the target variable)
    var_data = dataset.variables[variable_name][:]  # Change variable name as needed
    time = dataset.variables['time'][:]  # Time data (usually days since a date)
    lat = dataset.variables['lat'][:]  # Latitude
    lon = dataset.variables['lon'][:]  # Longitude

    # Ensure the output directory exists
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Loop through each time step (monthly data) and save a .png file for each month
    for i, t in enumerate(time):
        plt.figure(figsize=(10, 6))
        plt.contourf(lon, lat, var_data[i, :, :], cmap=cmap)  # Plot the data
        plt.colorbar(label=f'{variable_name}')
        year = 2002 + i // 12  # Calculate the year based on the time step
        month = (i % 12) + 1   # Calculate the month

        plt.title(f'{variable_name} for {year}-{month:02d}')  # Add year and month to title

        # Save the plot as a .png file in the output folder
        output_file = os.path.join(output_folder, f'{variable_name}_{year}_{month:02d}.png')
        plt.savefig(output_file)
        plt.close()  # Close the figure to free up memory

    print(f"All .png images have been saved to {output_folder}.")

# Example usage to convert .nc file to .png
def convert_nc_folder_to_png(input_nc_file, output_folder, variable_name, cmap='RdYlBu_r'):
    print(f"Processing {input_nc_file}...")
    convert_nc_to_png(input_nc_file, output_folder, variable_name, cmap)

# Define the paths
input_nc_file = 'path/to/your/SMI-Jan-2002--Jan-2005.nc'  # Path to your .nc file
output_png_folder = 'path/to/save/png/files'  # Folder to save the .png files
variable = 'SMI'  # Replace with the variable name you want to plot (e.g., Soil Moisture Index)

# Convert the .nc file to .png images
convert_nc_folder_to_png(input_nc_file, output_png_folder, variable)
