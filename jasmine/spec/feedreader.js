/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

       // Test that checks every element in allFeeds has a url and it is not empty
        it('has link', function() {
            for(let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].hasOwnProperty('url')).toBe(true);
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        // Test that checks every element in allFeeds has a name and it is not empty
        it('has name', function() {
            for(let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].hasOwnProperty('name')).toBe(true);
                expect(allFeeds[i].url).not.toBe('');
            }
        });
    });

    // Test suite to check the hamburger menu element
    describe('The menu', function() {
        
        // Define common biding of test
        const body = document.querySelector('body');

        // Test that ensures the menu element is hidden by default
        it('menu hidden', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        // Test that the menu element opens on click and closes on click
        it('open and close menu', function() {
            const menu = document.querySelector('.menu-icon-link');
            // First click
            menu.click();
            expect(body.classList.contains('menu-hidden')).not.toBe(true);
            // Second click
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

    });

    // Test suite to check that there is at least a initial entry
    describe('Initial Entries', function() {

        // Wait until loadFeed is finished
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
            
        });

        // Test that there is at least one entry feed
        it('at least a single entry', function(done) {
            const feed = document.querySelector('.feed');
            expect(feed.hasChildNodes()).toBe(true);
            done();
        });

    });

     // Test suite to check that ensures the content changes if a new feed is loaded
     describe('New Feed Selection', function() {
        let feed0,
            feed1;

        // Wait until loadFeed is finished
        beforeEach(function(done) {
            loadFeed(0, function() {
                feed0 = document.querySelector('.feed');
                loadFeed(1, function() {
                    feed1 = document.querySelector('.feed');
                });
                done();
            });
        });

        // Test that there is at least one entry feed
        it('feed changes', function(done) {
            const feed = document.querySelector('.feed');
            expect(feed0).not.toBe(feed1);
            done();
        });
    });
}());
