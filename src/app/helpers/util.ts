export class Util {
  constructor() {
  }

  static mixin(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
      });
    });
  }

  static formatDate(date: any) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    let month = '' + (date.getMonth() + 1),
      day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  static handleMultiSelectWithAllOptionChange(formControl, selectionModel) {
    if (selectionModel.hasValue()) {
      const firstItem = selectionModel._selected[0];

      if (selectionModel.selected.length > 1 && firstItem.value === 'all') {
        if (firstItem.active) {
          formControl.setValue(['all']);
        } else {
          formControl.setValue(formControl.value.slice(1));
        }
      }
    } else {
      formControl.setValue(['all']);
    }
  }

  /**
   * Format time value in minutes to "xh ym";
   * where x hours and y is minutes;
   *
   * @param {number} value
   * @returns {number}
   */
  static formatTimeDuration(value: number): string {
    let formattedValue: string;

    if (!value) {
      formattedValue = '0';
    }

    if (value >= 60) {
      let mins = value % 60;

      formattedValue = `${(Math.floor(value / 60))}h `;

      if (mins) {
        formattedValue += `${mins}m`;
      }
    } else {
      formattedValue = `${value}m`;
    }

    return formattedValue;
  }

  /**
   * Get an object key value where key specified in dot notation.
   *
   * @param obj
   * @param path
   * @returns {*}
   */
  static objectGet(obj, path) {
    const pathArray = path.split('.');

    if (!Util.isset(obj)) {
      return null;
    }

    for (let i = 0; i < pathArray.length; i++) {
      obj = obj[pathArray[i]];

      if (!Util.isset(obj)) {
        break;
      }
    }

    return obj;
  }

  /**
   * Set an object key value where key specified in dot notation.
   *
   * @param obj
   * @param path
   * @param value
   */
  static objectSet(obj, path, value) {
    if (typeof(path) === 'string') {
      path = path.split('.');
    }
    if (!Util.isset(obj[path[0]])) {
      obj[path[0]] = {};
    }
    if (path.length > 1) {
      Util.objectSet(obj[path.shift()], path, value);
    } else {
      obj[path[0]] = value;
    }
  }

  static objectPush(obj, path, value) {
    if (typeof(path) === 'string') {
      path = path.split('.');
    }
    if (!Util.isset(obj[path[0]])) {
      obj[path[0]] = {};
    }
    if (path.length > 1) {
      Util.objectPush(obj[path.shift()], path, value);
    } else {
      if (! Array.isArray(obj[path[0]])) {
        obj[path[0]] = [];
      }

      obj[path[0]].push(value);
    }
  }

  /**
   * Checks whether given value is null or undefined.
   *
   * @returns {boolean}
   */
  static isset(...args) {
    //  discuss at: http://phpjs.org/functions/isset/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: FremyCompany
    // improved by: Onno Marsman
    // improved by: Rafał Kukawski
    //   example 1: isset( undefined, true);
    //   returns 1: false
    //   example 2: isset( 'Kevin van Zonneveld' );
    //   returns 2: true

    let a = args;
    let l = a.length;
    let i = 0;
    let undef;

    if (l === 0) {
      throw new Error('Empty isset');
    }

    while (i !== l) {
      if (a[i] === undef || a[i] === null) {
        return false;
      }
      i++;
    }

    return true;
  }

  static formatApiFilter (filterableFields,  filters) {
    const where = {};

    filters.forEach(function (item) {
      const bits = item.match(/^\s*([a-z]+?)\s*([!=><]+)\s*([a-z0-9A-Z* ]+)$/);

      bits[3] = bits[3].trim();

      switch (bits[2]) {
        case '=':
          if (bits[3].indexOf('*') > -1) {
            Util.objectSet(where, `${filterableFields[bits[1]]}.like`, bits[3].replace(/\*/g, '%'));
          } else {
            Util.objectPush(where, `${filterableFields[bits[1]]}.inq`, bits[3]);
          }
          break;

        case '!=':
          if (bits[3].indexOf('*') > -1) {
            Util.objectSet(where, `${filterableFields[bits[1]]}.nlike`, bits[3].replace(/\*/g, '%'));
          } else {
            Util.objectPush(where, `${filterableFields[bits[1]]}.nin`, bits[3]);
          }
          break;

        case '>':
          Util.objectPush(where, `${filterableFields[bits[1]]}.gt`, bits[3]);
          break;

        case '<':
          Util.objectPush(where, `${filterableFields[bits[1]]}.lt`, bits[3]);
          break;
      }
    });

    return where;
  }
}
