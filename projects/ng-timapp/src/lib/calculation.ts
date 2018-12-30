import { Time } from './time';
import { Formatting } from './formatting';
import { ClonablePrototypeInterface } from './clonable-prototype-interface';


export class Calculation  implements ClonablePrototypeInterface<Calculation> {

    private time: Time;

    private elapsedHours: number;
    private elapsedMinutes: number;
    private elapsedSeconds: number;

    constructor(time: Time) {
        this.time = time;

        this.elapsedHours = 0;
        this.elapsedMinutes = 0;
        this.elapsedSeconds = 0;
    }

    getClone(): Calculation {
        return Object.assign(new Calculation(new Time({})), this);
    }

    calculatesHours(): number {
        return Number.parseInt(this.getHours()) + this
            .hoursContainedInMinutes(Number.parseInt(this.getMinutes()));
    }

    calculatesMinutes(): number {
        this.time.addsMinutes(this.minutesContainedInSeconds(Number
            .parseInt(this.getSeconds())));

        return Number.parseInt(this.getMinutes()) - (this
            .hoursContainedInMinutes(Number.parseInt(this
                .getMinutes())) * 60);
    }

    calculatesSeconds(): number {
        return Number.parseInt(this.getSeconds()) - (this
            .minutesContainedInSeconds(Number.parseInt(this
                .getSeconds())) * 60);
    }

    calculatesSum(timeAsHashTable: Object): Calculation {

        const
            clone = this.getClone();

        clone.time = this.time.getClone();

        let
            seconds: number = 0,
            minutes: number = 0;

        // resolve seconds
        if (!timeAsHashTable['seconds']) {
            timeAsHashTable['seconds'] = 0;
        }
        clone.time.addsSeconds(Number.parseInt(timeAsHashTable['seconds']));
        seconds = clone.calculatesSeconds();

        // resolve minutes
        if (!timeAsHashTable['minutes']) {
            timeAsHashTable['minutes'] = 0;
        }
        clone.time.addsMinutes(Number.parseInt(timeAsHashTable['minutes']));
        minutes = clone.calculatesMinutes();

        // resolve hours
        if (!timeAsHashTable['hours']) {
            timeAsHashTable['hours'] = 0;
        }
        clone.time.addsHours(Number.parseInt(timeAsHashTable['hours']));

        clone.time.resetHours(clone.calculatesHours());
        clone.time.resetMinutes(minutes);
        clone.time.resetSeconds(seconds);

        return clone;
    }

    calculatesElapsedTime(elapsedTime: Time): Calculation {

        const
            clone = this.getClone(),
            calculation = new Calculation(elapsedTime),
            calculatedHours: number = clone.calculatesHours(),
            calculatedMinutes: number = clone.calculatesMinutes(),
            calculatedSeconds: number = clone.calculatesSeconds(),
            elapsedResolvedHours: number = calculation.calculatesHours(),
            elapsedResolvedMinutes: number = calculation.calculatesMinutes(),
            elapsedResolvedSeconds: number = calculation.calculatesSeconds(),
            elapsedSeconds: number = elapsedResolvedSeconds -
                calculatedSeconds,
            elapsedMinutes: number = elapsedResolvedMinutes -
                calculatedMinutes,
            elapsedHours: number = elapsedResolvedHours - calculatedHours;

        let
            realElapsedHours: number = elapsedHours,
            realElapsedMinutes: number = elapsedMinutes,
            realElapsedSeconds: number = elapsedSeconds;

        if (elapsedHours < 0) {
            realElapsedHours = 24 - Math.abs(elapsedHours);
        }

        if (elapsedMinutes < 0) {
            realElapsedMinutes = 60 - Math.abs(elapsedMinutes);

            realElapsedHours -= 1;
        }

        if (elapsedSeconds < 0) {
            realElapsedSeconds = 60 - Math.abs(elapsedSeconds);

            realElapsedMinutes -= 1;
        }

        clone.elapsedHours = realElapsedHours;
        clone.elapsedMinutes = realElapsedMinutes;
        clone.elapsedSeconds = realElapsedSeconds;

        return clone;
    }

    getHours(asAbsolute: boolean = true) {
        return this.time.getHours(asAbsolute);
    }

    getMinutes(asAbsolute: boolean = true) {
        return this.time.getMinutes(asAbsolute);
    }

    getSeconds(asAbsolute: boolean = true) {
        return this.time.getSeconds(asAbsolute);
    }

    getElapsedHours(): string {
        return Formatting.formatHours(this.elapsedHours, false);
    }

    getElapsedMinutes(): string {
        return Formatting.formatMinutes(this.elapsedMinutes, false);
    }

    getElapsedSeconds(): string {
        return Formatting.formatSerconds(this.elapsedSeconds, false);
    }

    private hoursContainedInMinutes(minutes: number = 0): number {
        return Math.trunc(minutes / 60);
    }

    private minutesContainedInSeconds(seconds: number = 0): number {
        return Math.trunc(seconds / 60);
    }

}
