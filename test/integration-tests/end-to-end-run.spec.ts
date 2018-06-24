import * as chai from 'chai';
import * as chaiSpies from 'chai-spies';

chai.use(chaiSpies);
const expect = chai.expect;

const cmd = require('node-command-line');
const fs  = require('fs');

const testData = [
    { filePath: './data/input_1.txt', distanceInKms: 10, expectedOutputFilePath: './data/output_1_10km.txt' },
    { filePath: './data/input_1.txt', distanceInKms: 100, expectedOutputFilePath: './data/output_1_100km.txt' },
    { filePath: './data/input_1.txt', distanceInKms: 1000, expectedOutputFilePath: './data/output_1_1000km.txt' },
    { filePath: './data/input_1.txt', distanceInKms: 5000, expectedOutputFilePath: './data/output_1_5000km.txt' },
    { filePath: './data/input_1.txt', distanceInKms: 10000, expectedOutputFilePath: './data/output_1_10000km.txt' }
];


describe('End to end test suite', () => {

    testData.forEach(function(test) {

        it(`correctly calculates ${test.filePath} and ${test.distanceInKms}`, (done) => {

                // arrange
                var expectedOutput = fs.readFileSync(test.expectedOutputFilePath, 'utf8').replace(/\r\n/g, '\n');

                // act
                cmd
                .run(`ts-node ./src/main.ts ${test.filePath} ${test.distanceInKms}`)
                .then((result) => {
                    // assert
                    expect(result.message).to.be.equal(expectedOutput);
                    done();
                });
        });
    });
});
