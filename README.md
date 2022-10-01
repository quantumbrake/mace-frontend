# mace: Recipe CO2 estimator

Have you ever looked at a recipe and wondered what the CO2 emissions of its ingredients are? Us neither.

Anyway, here is a tool that does that. Just input the recipe as plaintext and out pops the CO2 emissions in grams. 

## Features

- Handles unit conversions from common units (e.g. ml, teaspoon, oz etc).
- Can also handle conversions from volumes and weights (e.g. you can use 100ml or 100g water).
- Finds closest match of ingredient names, and returns a confidence score with the emissions. 
    - You can modify the ingredient name if you are dissatisfied with the match returned.

## References

The CO2 emissions of ingredients are sourced from https://www.science.org/doi/10.1126/science.aaq0216.

### Densities

- http://www.mpd-inc.com/bulk-density/
- https://www.engineeringtoolbox.com
- https://www.diva-portal.org/smash/get/diva2:942829/FULLTEXT01.pdf
- https://www.aqua-calc.com/page/density-table/substance/
- http://www.mpd-inc.com/bulk-density/