(function($) {

    module('freeze methods');

    test('freeze', function () {
        expect(1);
        
        $.scrollFreeze.freeze();
        ok($.scrollFreeze.isFrozen(), "Pass");
    });

    test('freeze with overflow', function () {
        expect(2);
        
        $.scrollFreeze.useOverflow();

        $.scrollFreeze.freeze();
        ok($.scrollFreeze.isFrozen(), "Pass");

        strictEqual($('body').css('overflow'), 'hidden', "overflow: hidden set on body");
    });


    module('thaw methods');

    test('thaw', function () {
        expect(1);
        
        $.scrollFreeze.thaw();
        ok(!$.scrollFreeze.isFrozen(), "Pass");
    });

    test('thaw with overflow', function () {
        expect(2);
        
        $.scrollFreeze.useOverflow();

        $.scrollFreeze.thaw();
        ok(!$.scrollFreeze.isFrozen(), "Pass");

        strictEqual($('body').css('overflow'), 'visible', "overflow: visible set on body");
    });


    module('other methods');

    test('enable', function () {
        expect(1);

        $.scrollFreeze.enable();
        ok($.scrollFreeze.isEnabled(), "Pass");
    });

    test('enable after disable while frozen with overflow', function () {
        expect(5);
        
        $.scrollFreeze.useOverflow();

         $.scrollFreeze.freeze();
        ok($.scrollFreeze.isFrozen(), "is frozen");

        $.scrollFreeze.disable();
        ok(!$.scrollFreeze.isEnabled(), "is disabled");

        strictEqual($('body').css('overflow'), 'visible', "overflow hidden removed from body");

        $.scrollFreeze.enable();
        ok($.scrollFreeze.isEnabled(), "is reenabled");

        strictEqual($('body').css('overflow'), 'hidden', "overflow: hidden set on body");
    });

    test('disable', function () {
        expect(1);
        
        $.scrollFreeze.disable();
        ok(!$.scrollFreeze.isEnabled(), "Pass");
    });


}(jQuery));