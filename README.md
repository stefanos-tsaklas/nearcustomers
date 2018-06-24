# Instructions:
    1. git clone https://github.com/stefanos-tsaklas/nearcustomers.git
    2. npm install -g ts-node
    3. npm install
    4. npm run demo

# Example usage:
    1. npm run demo
    2. npm run demo ./data/input_1.txt 112 200 32.33 -119.12

# Other commands:
    1. npm run test (runs all unit and integration tests)
    2. npm run lint (lints code in src and test folders)

# Demo:
![Alt Text](https://github.com/stefanos-tsaklas/nearcustomers/blob/master/demo.gif)

# Design:
The problem has been split in different classes that implement small part of the problem,
so that we can switch implementations for some step, solve similar problems, and unit test the code.

# Assumptions:
1. All data fits in memory
2. Invalid customer records in input file are silently ignored

# TODO:

1. Add different implementations of interfaces (e.g. get input customers or calculate distance by calling api via http)
2. Benchmark performance
