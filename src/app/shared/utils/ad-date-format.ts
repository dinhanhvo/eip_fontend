
export interface JsDateFmt {
    pattern: string,
    showTime: boolean,
    hourFmt: string
};

export class AdDateFormat {
    public static toJsDateFmt(javaFmt): JsDateFmt {
        let res: string = javaFmt;
        let showTime: boolean = false;
        let hourFmt: string = "12";
        const patterns = [
            /yyyy/g,
            /yy/g,
            /MMMM/g,
            /MMM/g,

            /MM/g,
            /M/g,
            /DDD/g,
            /D/g,

            /HH/g,
            /H+|m+|s+/g
        ];
        const repls: (any)[] = [
            'yy',
            'y',
            'MM',
            'M',

            'mm',
            'm',
            'oo',
            'o',

            (x) => {
                showTime = true;
                hourFmt = "24";
                return '';
            },
            (x) => {
                showTime = true
                return '';
            }
        ];

        const values = [];

        const nExprs = patterns.length;
        for (let i = 0; i < nExprs; i++) {
            let newVal = res.replace(patterns[i], (x) => {
                if (typeof (repls[i]) === 'string') {
                    values.push(repls[i]);
                    return '{' + (values.length - 1) + '}';
                }
                if (typeof (repls[i]) === 'function') {
                    let v1 = repls[i](x);
                    values.push(v1);
                    return '{' + (values.length - 1) + '}';
                }
                return x;
            });
            res = newVal;
        }

        //console.log('res', res);

        let pattern: string = res.replace(/\{[^\}]+\}/g, function (m) {
            //console.log('match', m);
            return values[m.substring(1, m.length-1)];
        });

        return {
            pattern,
            showTime,
            hourFmt
        };
    }
}
