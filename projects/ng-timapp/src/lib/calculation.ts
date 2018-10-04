export class Calculation {

    private hours: number;
    private minutes: number;
    private seconds: number;

    constructor(attrs: Object = {}) {
        this.hours = attrs['hours'] || 0;
        this.minutes = attrs['minutes'] || 0;
        this.seconds = attrs['seconds'] || 0;
    }

    minutesContainedInSeconds(...seconds): number {
        return Math.trunc(Calculation.sumValues
            .apply(null, [this.seconds].concat(seconds)) / 60);
    }

    hoursContainedInMinutes(...minutes): number {
        return Math.trunc(Calculation.sumValues
            .apply(null, [this.minutes].concat(minutes)) / 60);
    }

    calculateSeconds(...seconds) {
        return Calculation.sumValues.apply(null, [this.seconds].concat(seconds)) -
            (this.minutesContainedInSeconds.apply(this, seconds) * 60);
    }

    calculateMinutes(...minutes) {
        return Calculation.sumValues.apply(null, [this.minutes].concat(minutes)) -
            (this.hoursContainedInMinutes.apply(this, minutes) * 60);
    }

    sum(...time) {
        let
            minutesOverSeconds: number,
            hoursOverMinutes: number;

        time.forEach(
            (o: Object) => {
                if (!o['seconds']) {
                    o['seconds'] = 0;
                }

                if ((o['seconds'] + this.seconds) < 60) {
                    this.seconds += o['seconds'];
                } else {
                    minutesOverSeconds = this
                        .minutesContainedInSeconds(o['seconds']);
                    this.seconds = this.calculateSeconds(o['seconds']);
                    this.minutes += minutesOverSeconds;
                }

                if (!o['minutes']) {
                    o['minutes'] = 0;
                }

                if ((o['minutes'] + this.minutes) < 60) {
                    this.minutes += o['minutes'];
                } else {
                    hoursOverMinutes = this
                        .hoursContainedInMinutes(o['minutes']);
                    this.minutes = this
                        .calculateMinutes(o['minutes']);
                    this.hours += hoursOverMinutes;
                }

                if (!o['hours']) {
                    o['hours'] = 0;
                }

                this.hours += o['hours'];
            }
        );
    }

    getHours(): number {
        return this.hours;
    }

    getMinutes(): number {
        return this.minutes;
    }

    getSeconds(): number {
        return this.seconds;
    }

    private static sumValues(...values) {
        let
            sum: number = 0

        values.forEach(
            (value) => {
                sum += value;
            }
        );

        return sum;
    }

}