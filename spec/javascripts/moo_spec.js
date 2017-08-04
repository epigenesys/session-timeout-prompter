describe("Moo", function() {

  var moo;

  beforeEach(function() {
    moo = new Moo();
  });

  it("moos", function() {
    expect(moo.moo()).toEqual("Moooo!");
  });

});
