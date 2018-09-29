export class Conversion {

    private hours: number;
    private minutes: number;
    private seconds: number;

    private hoursAsString: string;
    private minutesAsString: string;
    private secondsAsString: string;

    constructor(attrs: Object = {}) {
        this.hours = attrs['hours'] || 0;
        this.minutes = attrs['minutes'] || 0;
        this.seconds = attrs['seconds'] || 0;

        this.resolve(attrs);
    }

    getHours(): string {
        return this.hoursAsString;
    }

    getMinutes(): string {
        return this.minutesAsString;
    }

    getSeconds(): string {
        return this.secondsAsString;
    }

    private resolve(attrs: Object) {
        let
            relativeUnity: string;

        const
            keys = Object.keys(attrs);

        if (keys.length) {
            relativeUnity = keys[0];
        }

        if (relativeUnity) {
            switch(relativeUnity) {
                case 'seconds': this.makeThroughSeconds()
                    break;
            }
        }

        this.format();
    }

    private format() {
        if (parseInt(this.hoursAsString) < 10) {
            this.hoursAsString = `0${this.hoursAsString}`;
        }

        if (parseInt(this.minutesAsString) < 10) {
            this.minutesAsString = `0${this.minutesAsString}`;
        }

        if (parseInt(this.secondsAsString) < 10) {
            this.secondsAsString = `0${this.secondsAsString}`;
        }
    }

    private makeThroughSeconds() {
        let
            minutes = Math.trunc(this.seconds / 60),
            elapsedMinutes: number = minutes % 60,
            elapsedSeconds: number = this.seconds % 60;

        const
            hours = Math.trunc(minutes / 60);

        this.hoursAsString = `${hours}`;
        this.minutesAsString = `${elapsedMinutes}`;
        this.secondsAsString = `${elapsedSeconds}`;
    }

}