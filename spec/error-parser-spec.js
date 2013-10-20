describe('error-parser.js', function() {
    describe('ErrorParser', function() {
        describe('#chooseParser', function() {
            var unit = new ErrorParser();
            it('should detect V8', function() {
                expect(unit.chooseParser(CapturedExceptions.chrome_15)).toBe(unit.parseV8);
            });
            it('should detect Firefox', function() {
                expect(unit.chooseParser(CapturedExceptions.firefox_36)).toBe(unit.parseSpiderMonkey);
                expect(unit.chooseParser(CapturedExceptions.firefox_7)).toBe(unit.parseSpiderMonkey);
                expect(unit.chooseParser(CapturedExceptions.firefox_14)).toBe(unit.parseSpiderMonkey);
            });
            it('should detect Safari', function() {
                expect(unit.chooseParser(CapturedExceptions.safari_6)).toBe(unit.parseNitro);
            });
            it('should detect IE', function() {
                expect(unit.chooseParser(CapturedExceptions.ie_10)).toBe(unit.parseChakra);
            });
            it('should detect Opera', function() {
                expect(unit.chooseParser(CapturedExceptions.opera_854)).toBe(unit.parseOPERA);
                expect(unit.chooseParser(CapturedExceptions.opera_902)).toBe(unit.parseOPERA);
                expect(unit.chooseParser(CapturedExceptions.opera_927)).toBe(unit.parseOPERA);
                expect(unit.chooseParser(CapturedExceptions.opera_1010)).toBe(unit.parseOPERA);
                expect(unit.chooseParser(CapturedExceptions.opera_1063)).toBe(unit.parseOPERA);
                expect(unit.chooseParser(CapturedExceptions.opera_1111)).toBe(unit.parseOPERA);
                expect(unit.chooseParser(CapturedExceptions.opera_1151)).toBe(unit.parseOPERA);
            });
        });

        describe('#parseNitro', function() {
            var unit = new ErrorParser();
            it('should parse Safari 6 Errors', function() {
                var errorInfo = unit.parseNitro(CapturedExceptions.safari_6);
                expect(errorInfo.stack).toBeTruthy();
                expect(errorInfo.stack.length).toBe(3);
                expect(errorInfo.stack[0]).toEqual({fn: '{anonymous}', args: [], src: 'scheme://path/to/file.js', line: '48', char: undefined});
                expect(errorInfo.stack[1]).toEqual({fn: 'dumpException3', args: [], src: 'scheme://path/to/file.js', line: '52', char: undefined});
                expect(errorInfo.stack[2]).toEqual({fn: 'onclick', args: [], src: 'scheme://path/to/file.js', line: '82', char: undefined});
                expect(errorInfo.message).toBeTruthy();
                expect(errorInfo.message).toEqual("'null' is not an object (evaluating 'x.undef')");
            });
        });

        describe('#parseV8', function() {
            var unit = new ErrorParser();
            // FIXME: mock up an impl that used Error.prepareStackTrace
            it('should parse V8 Errors', function() {
                var errorInfo = unit.parseV8(CapturedExceptions.chrome_15);
                expect(errorInfo.stack).toBeTruthy();
                expect(errorInfo.stack[0]).toEqual({fn: 'bar', args: [], src: 'scheme://path/to/file.js', line: '13', char: '17'});
                expect(errorInfo.stack[1]).toEqual({fn: 'bar', args: [], src: 'scheme://path/to/file.js', line: '16', char: '5'});
                expect(errorInfo.stack[2]).toEqual({fn: 'foo', args: [], src: 'scheme://path/to/file.js', line: '20', char: '5'});
                expect(errorInfo.stack.length).toBe(3);
            });
        });
    });
});
