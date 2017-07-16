import moment from 'moment'

const ONE_DAY = 86400000

class TransformService {

    // Helper methods
    _formatDateNumber(number) {
        if (number < 10) {
            return `0${number}`
        }
        return number
    }

    /*
    * _calculateTimeElements(dateDifference) - the passed parametar is in milliseconds
    * calculate the number of days, h, m and seconds in that interval
    */
    _calculateTimeElements(dateDifference) {
        var days = Math.floor(dateDifference / (1000 * 60 * 60 * 24))
        var hours = Math.floor((dateDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        var minutes = Math.floor((dateDifference % (1000 * 60 * 60)) / (1000 * 60))
        var seconds = Math.floor((dateDifference % (1000 * 60)) / 1000)
        return ([days, hours, minutes, seconds])
    }

    /**
     *
     * Methods that are used in the app
     *
     */
    formatDate(date) {
        var date = (date === undefined) ? new Date() : date
        return this._formatDateNumber(date.getHours()) + ':' + this._formatDateNumber(date.getMinutes()) + ':' + this._formatDateNumber(date.getSeconds())
    }

    /*
    * formatTimer(endDate, timeRef) - countdown clock showing the life span of each qustion/answer, placed in the footer
    * endDate - fetched from the backend, format: 2017-07-15 15:54:21 in 24 hours; Each JSON object hold this info;
    */

    formatTimer(endDate, timerRef) {

        // New date
        var now = new Date()

        // Next Questions: 9am and 7pm
        if (endDate == null) {

            // New date object
            endDate = new Date(now)

            if (now.getHours() >= 0 && now.getHours() < 9) {
                // Setup for 9am next day
                endDate.setHours(9)
                endDate.setMinutes(0)
                endDate.setSeconds(0)
            }

            if (now.getHours() >= 9 && now.getHours() < 19) {
                // Setup for 7pm the same day
                endDate.setHours(19)
                endDate.setMinutes(0)
                endDate.setSeconds(0)
            }

            if (now.getHours() >= 19 && now.getHours() <= 23) {
                // Setup for 9am next day
                endDate.setHours(9)
                endDate.setMinutes(0)
                endDate.setSeconds(0)
                endDate.setTime(endDate.getTime() + (1000 * 60 * 60 * 24))
            }

            endDate = endDate.getTime()
        } else {
            endDate = moment(endDate).unix() * 1000
        }

        var diff = endDate - now.getTime()

        if (diff < 0) {
            diff = Math.abs(diff)

            var tmpD = new Date(endDate)
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            result = tmpD.toLocaleDateString('de-DE', options)

            // expired between 0 hours and 24 hours
            if ( now.getDay() == tmpD.getDay() ){
              if(diff < ONE_DAY ) {
                result = 'Heute'
                console.log("true");
              }
            }
            // expired betweem 24 hours and 48 hours
            if( (now.getDay() != tmpD.getDay()) && diff < ONE_DAY ){
                result = "Gestern"
            }

            console.log(now.getDay(), tmpD.getDay());

            clearInterval(timerRef)
        } else {

            var days = hours = minutes = seconds = result = ""
            var timeElements = this._calculateTimeElements(diff)

            days = Math.abs(timeElements[0])
            hours = Math.abs(timeElements[1])
            minutes = Math.abs(timeElements[2])
            seconds = Math.abs(timeElements[3])

            /*
            * When using reald data (uncomment the code bellow) - Always display only two time-elements display
            * dd:hh or hh:mm or mm:ss - depending on the life time left of the question
            *
            */
            if (days > 0) {
                result = this._formatDateNumber(timeElements[0]).toString().concat('d ').concat(this._formatDateNumber(timeElements[1]).toString().concat('h'))
            } else if (days == 0 && hours > 0) {
                result = this._formatDateNumber(timeElements[1]).toString().concat('h ').concat(this._formatDateNumber(timeElements[2]).toString().concat('m'))
            } else if (days == 0 && hours == 0 && minutes > 0) {
                result = this._formatDateNumber(timeElements[2]).toString().concat('m ').concat(this._formatDateNumber(timeElements[3]).toString().concat('s'))
            } else {
                result = this._formatDateNumber(timeElements[2]).toString().concat('m ').concat(this._formatDateNumber(timeElements[3]).toString().concat('s'))
            }


            //result = this._formatDateNumber(days).toString().concat(':').concat(this._formatDateNumber(hours).toString().concat(':').concat(this._formatDateNumber(minutes).toString().concat(':').concat(this._formatDateNumber(seconds).toString())))
        }
        return result
    }
}

export default new TransformService()
