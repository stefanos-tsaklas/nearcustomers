# Instructions:
    1. git clone https://github.com/stefanos-tsaklas/nearcustomers.git
    2. npm install -g ts-node
    3. ts-node ./main.ts input.txt <optional file name> <optional distance in km>


# Demo:
![Alt Text](https://github.com/stefanos-tsaklas/nearcustomers/blob/master/demo.gif)

# Design:
The problem has been split in different classes that implement small part of the problem,
so that we can switch implementations for some step, solve similar problems, and unit test the code.

# Assumptions:
1. All data fits in memory
2. Input file contains well formed data

# TODO:

1. Add  tests
2. Add different implementations of interfaces (e.g. get input customers or calculate distance by calling api via http)
3. Benchmark performance
