describe('Testing GameController', function() {
  var gameController, $timeout;

  /* declare our mocks out here
   * so we can use them through the scope
   * of this describe block.
   */
  var PlayersServiceMock;


  // This function will be called before every "it" block.
  // This should be used to "reset" state for your tests.
  beforeEach(function() {
    // Create a "spy object" for our PlayersService.
    // This will isolate the controller we're testing from
    // any other code.
    // we'll set up the returns for this later
    PlayersServiceMock = jasmine.createSpyObj('PlayersService', ['getPlayers']);

    // load the module you're testing.
    module('dartApp');

    // INJECT! This part is critical
    // $rootScope - injected to create a new $scope instance.
    // $controller - injected to create an instance of our controller.
    // $q - injected so we can create promises for our mocks.
    // _$timeout_ - injected to we can flush unresolved promises.
    inject(function($controller, $q, _$timeout_) {

      // set up the returns for our PlayersServiceMock
      // $q.when('weee') creates a resolved promise to "weee".
      // this is important since our service is async and returns
      // a promise.
      var returnPlayers = {
        "google:108137819545210249395": {
          "active": true,
          "expires": 1458907687,
          "name": "Test user 1",
          "uid": "google:1081234242340249395"
        },
        "google:113517797324394678664": {
          "active": false,
          "expires": 1458996090,
          "name": "Test user 2",
          "uid": "google:343423478664"
        },
        "google:114327271526878124158": {
          "active": true,
          "expires": 1458901527,
          "name": "Test user 3",
          "uid": "google:11234234234124158"
        }
      };

      PlayersServiceMock.getPlayers.and.returnValue($q.when('weee'));

      // assign $timeout to a scoped variable so we can use
      // $timeout.flush() later. Notice the _underscore_ trick
      // so we can keep our names clean in the tests.
      $timeout = _$timeout_;

      // now run that scope through the controller function,
      // injecting any services or other injectables we need.
      // **NOTE**: this is the only time the controller function
      // will be run, so anything that occurs inside of that
      // will already be done before the first spec.
      gameController = $controller('GameController', {
        PlayersService: PlayersServiceMock
      });
    });
  });

  it('scores should be initialized', function() {
    expect(gameController.scores).toEqual({});
  });

  it('players shoudl be initialized', function () {
    expect(PlayersServiceMock.getPlayers).toHaveBeenCalled();
  })


  // /* Test 1: The simplest of the simple.
  //  * here we're going to test that some things were
  //  * populated when the controller function whas evaluated. */
  // it('should start with foo and bar populated', function() {
  //
  //   //just assert. $scope was set up in beforeEach() (above)
  //   expect($scope.foo).toEqual('foo');
  //   expect($scope.bar).toEqual('bar');
  // });
  //
  //
  // /* Test 2: Still simple.
  //  * Now let's test a simple function call. */
  // it('should add !!! to foo when test1() is called', function (){
  //   //set up.
  //   $scope.foo = 'x';
  //
  //   //make the call.
  //   $scope.test1();
  //
  //   //assert
  //   expect($scope.foo).toEqual('x!!!');
  // });
  //
  //
  // /* Test 3: Testing a $watch()
  //  * The important thing here is to call $apply()
  //  * and THEN test the value it's supposed to update. */
  // it('should update baz when bar is changed', function (){
  //   //change bar
  //   $scope.bar = 'test';
  //
  //   //$apply the change to trigger the $watch.
  //   $scope.$apply();
  //
  //   //assert
  //   expect($scope.baz).toEqual('testbaz');
  // });
  //
  //
  /* Test 4: Testing an asynchronous service call.
     Since we've mocked the service to return a promise
     (just like the original service did), we need to do a little
     trick with $timeout.flush() here to resolve our promise so the
     `then()` clause in our controller function fires.

     This will test to see if the `then()` from the promise is wired up
     properly. */
  // it('should update fizz asynchronously when test2() is called', function (){
  //   // just make the call
  //   $scope.test2();
  //
  //   // asser that it called the service method.
  //   expect(PlayersServiceMock.getPlayers).toHaveBeenCalled();
  //
  //   // call $timeout.flush() to flush the unresolved dependency from our
  //   // PlayersServiceMock.
  //   $timeout.flush();
  //
  //   // assert that it set $scope.fizz
  //   expect($scope.fizz).toEqual('weee');
  // });
});
