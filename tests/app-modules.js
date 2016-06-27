var expect      = require('chai').expect
,   assert      = require('chai').assert
,   should      = require('chai').should
,   path        = require('path')
;



describe('app modules', function() {


    describe('parse-query.js', function() {

        var parseQuery = require(path.resolve(process.cwd(), 'src/js/parse-query.js'));


        it("should return `false` a url that doesn't contain a query string", function() {
            var test = 'https://testing.com/path/here';
            var value = parseQuery(test);

            expect(value).to.equal(false);
        });


        it("should return an object for a URL containing a query string", function() {
            var test = 'https://testing.com/path/here?query=true&params=50';
            var value = parseQuery(test);

            expect(value).to.be.an('object');
            expect(value).to.have.all.keys('query', 'params');
        });


        it("should return all keys for a URL containing a query string", function() {
            var test = 'https://testing.com/path/here?query=true&params=50&charlie';
            var value = parseQuery(test);

            expect(value).to.be.an('object');
            expect(value).to.have.all.keys('query', 'params', 'charlie');
        });


        it("should return all values for each key in a URL containing a query string", function() {
            var test = 'https://testing.com/path/here?query=true&params=50&charlie';
            var value = parseQuery(test);

            expect(value).to.be.an('object');
            expect(value).to.have.all.keys('query', 'params', 'charlie');
            expect(value.query).to.equal('true');
            expect(value.params).to.equal('50');
            expect(value.charlie).to.be.empty;
        });


        it("should parse just the query string portion as `?key=value&...", function() {
            var test = '?query=true&params=50&charlie';
            var value = parseQuery(test);

            expect(value).to.be.an('object');
            expect(value).to.have.all.keys('query', 'params', 'charlie');
            expect(value.query).to.equal('true');
            expect(value.params).to.equal('50');
            expect(value.charlie).to.be.empty;
        });
    });




    describe('custom lodash methods', function() {

        var _ = require(path.resolve(process.cwd(), 'src/js/lodash.js'));


        describe('_.serialize()', function() {

            var test = {
                name: 'steve'
            ,   occupation: 'bowler'
            ,   income: 30000
            ,   married: false
            };


            it("should return a string", function() {
                var value = _.serialize(test);

                expect(value).to.be.a('string');
            });


            it("should return false if not passing an object or array", function() {
                var value1 = _.serialize('testing');
                var value2 = _.serialize(true);
                var value3 = _.serialize(350);
                var value4 = _.serialize('350');

                expect(value1).to.equal(false);
                expect(value2).to.equal(false);
                expect(value3).to.equal(false);
                expect(value4).to.equal(false);
            });


            it("should return all keys of the original object", function() {
                var value = _.serialize(test);

                expect(value).to.be.a('string');
                expect(value).to.contain('name', 'occupation', 'income', 'married');
            });


            it("should return data serialized with `,` commas by default", function() {
                var value = _.serialize(test);

                expect(value).to.be.a('string');
                expect(value).to.equal('name=steve,occupation=bowler,income=30000,married=false');
                expect(value).to.not.equal(',name=steve,occupation=bowler,income=30000,married=false');
                expect(value).to.not.equal('name=steve,occupation=bowler,income=30000,married=false,');
            });


            it("should return data serialized with delimiter override argument (eg: `|`)", function() {
                var value = _.serialize(test, '|');

                expect(value).to.be.a('string');
                expect(value).to.not.equal('name=steve,occupation=bowler,income=30000,married=false');
                expect(value).to.equal('name=steve|occupation=bowler|income=30000|married=false');
                expect(value).to.not.equal('|name=steve|occupation=bowler|income=30000|married=false');
                expect(value).to.not.equal('name=steve|occupation=bowler|income=30000|married=false,');
            });
        });


    });


    describe('Handlebars helpers', function() {

        var Handlebars  = require('handlebars')
        ,   customHbs   = require(path.resolve(process.cwd(), 'src/js/handlebars.js'))
        ;

        Handlebars.helpers = customHbs.helpers;


        describe('{{phoneUS }} helper', function() {

            var template = Handlebars.compile('{{phoneUS testPhone }}');

            it("should accept an argument/value adn return a string", function() {
                value1 = template({ testPhone: 5125551234 });
                value2 = template({ testPhone: '5125551234' });

                expect(value1).to.be.a('string');
                expect(value2).to.be.a('string');
            });


            it("should format phone number as +1 (xxx) xxx-xxxx...", function() {
                value1 = template({ testPhone: 5125551234 });
                value2 = template({ testPhone: '5125551234' });

                expect(value1).to.equal('+1 (512) 555-1234');
                expect(value2).to.equal('+1 (512) 555-1234');
            });


            it("should reformat already formatted phone numbers", function() {
                value1 = template({ testPhone: '512-555-1234' });
                value2 = template({ testPhone: '(512)555-1234' });
                value3 = template({ testPhone: '512.555.1234' });
                value4 = template({ testPhone: '+1 (512)555-1234' });
                value5 = template({ testPhone: '1-512-555-1234' });
                value6 = template({ testPhone: '15125551234' });

                expect(value1).to.be.a('string');
                expect(value1).to.equal('+1 (512) 555-1234');

                expect(value2).to.be.a('string');
                expect(value2).to.equal('+1 (512) 555-1234');

                expect(value3).to.be.a('string');
                expect(value3).to.equal('+1 (512) 555-1234');

                expect(value4).to.be.a('string');
                expect(value4).to.equal('+1 (512) 555-1234');

                expect(value5).to.be.a('string');
                expect(value5).to.equal('+1 (512) 555-1234');

                expect(value6).to.be.a('string');
                expect(value6).to.equal('+1 (512) 555-1234');
            });

        });

    });



});
