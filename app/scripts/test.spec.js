describe('myApp', function () {

    it('should create "games" model with 4 games', function () {
        var scope = {},
            ctrl = new GameListCtrl(scope);

        expect(scope.games.length).toBe(4);
    });

});