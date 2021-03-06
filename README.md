# Instructions:
    1. git clone https://github.com/stefanos-tsaklas/nearcustomers.git
    2. npm install -g ts-node
    3. npm install
    4. npm run demo


# Demo:
![Alt Text](https://github.com/stefanos-tsaklas/nearcustomers/blob/master/demo.gif)

# Example usage:
    1. npm run demo
    2. npm run demo ./data/input_1.txt 200 32.33 -119.12
    3. npm run demo <optional input file> <optional distance in km> <optional longitude> <optional latitude>

# Other commands:
    1. npm run test (runs all unit and integration tests)
    2. npm run lint (lints code in src and test folders)

# Design:
The problem has been split in different classes that implement small part of the problem,
so that we can switch implementations for some step, solve similar problems, and unit test the code.

# Assumptions:
1. All data fits in memory
2. Invalid customer records in input file are silently ignored

# TODO:

1. Add different implementations of interfaces (e.g. get input customers or calculate distance by calling api via http - this might need to change interface to use Promise)
2. When you run npm run lint you get an error about semicolon after exporting default module
2. Benchmark performance
