/*
  pure-gen - generator method for combining pure methods based on string input

*/

function Fake(pure) {
    /**
     * Generator method for combining pure methods based on string input
     *
     *
     * @description
     * This will interpolate the format string with the value of methods
     * [name.lastName]{@link pure.name.lastName}, [name.firstName]{@link pure.name.firstName},
     * and [name.suffix]{@link pure.name.suffix}
     *
     * @param {string} str Docstring to replace with methods
     * @method pure.fake
     * @example
     * console.log(pure.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'));
     * //outputs: "Marks, Dean Sr."
     */
    this.fake = function fake(str) {
    // setup default response as empty string
        let res = '';

        // if incoming str parameter is not provided, return error message
        if (typeof str !== 'string' || str.length === 0) {
            throw new Error('string parameter is required!');
        }

        // find first matching {{ and }}
        const start = str.search('{{');
        const end = str.search('}}');

        // if no {{ and }} is found, we are done
        if (start === -1 && end === -1) {
            return str;
        }

        // extract method name from between the {{ }} that we found
        // for example: {{name.firstName}}
        const token = str.substr(start + 2, end - start - 2);
        let method = token.replace('}}', '').replace('{{', '');

        // extract method parameters
        const regExp = /\(([^)]+)\)/;
        const matches = regExp.exec(method);
        let parameters = '';
        if (matches) {
            method = method.replace(regExp, '');
            [, parameters] = matches;
        }

        // split the method into module and function
        const parts = method.split('.');

        if (typeof pure[parts[0]] === 'undefined') {
            throw new Error(`Invalid module: ${parts[0]}`);
        }

        if (typeof pure[parts[0]][parts[1]] === 'undefined') {
            throw new Error(`Invalid method: ${parts[0]}.${parts[1]}`);
        }

        // assign the function from the module.function namespace
        const fn = pure[parts[0]][parts[1]];

        // If parameters are populated here, they are always going to be of string type
        // since we might actually be dealing with an object or array,
        // we always attempt to the parse the incoming parameters into JSON
        let params;
        const verif1 = parameters[0] === '[' || parameters[0] === '{';
        const verif2 = parameters.indexOf(',') !== -1 && verif1;
        const verif3 = parameters !== '' && verif1;

        if (verif1 || verif2 || verif3) {
            params = JSON.parse(parameters);
        } else {
            params = parameters;
        }

        let result;
        if (typeof params === 'string' && params.length === 0) {
            result = fn.call(this);
        } else if (typeof params === 'string' && params.indexOf(',') !== -1) {
            result = fn.apply(this, params.split(','));
        } else {
            result = fn.call(this, params);
        }

        // replace the found tag with the returned fake value
        res = str.replace(`{{${token}}}`, result);

        // return the response recursively until we are done finding all tags
        return fake(res);
    };
}

module.exports = Fake;
