const utils = require('../utils')
describe("utils test", () => {
    describe("validarParametros test", () => {
        describe("'parametros invalidos' cases", () => {
            const ret = 'parametros invalidos';

            it('passing no params', () => {
                expect(utils.validarParametros()).toBe(ret)
            })

            it('passing empty array as params', () => {
                expect(utils.validarParametros([])).toBe(ret)
            })

            it('passing valid array but no numeroEsperado', () => {
                const params = [1, 2]
                expect(utils.validarParametros(params)).toBe(ret)
            })

            it('passing valid array but numeroEsperado with different size', () => {
                const params = [1, 2]
                const numeroEsperado = params.length + 1
                expect(utils.validarParametros(params, numeroEsperado)).toBe(ret)
            })
        })

        describe("undefined cases", () => {
            it('passing params array and numeroEsperado with the same value as array length', () => {
                const params = [1, 2]
                const numeroEsperado = params.length
                expect(utils.validarParametros(params, numeroEsperado)).toBeFalsy()
            })
        })
    })

    describe("createDiscordTag test", () => {
        it('should return author username and author discriminator with a # between', function () {
            const author = {
                username: 'user',
                discriminator: '2193'
            }

            expect(utils.createDiscordTag(author)).toBe(`${author.username}#${author.discriminator}`)
        });
    })


})