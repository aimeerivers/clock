# A colourful clock

See the clock in action at [sermoa.github.io/clock](https://sermoa.github.io/clock/)

This clock changes colours based on the current date and time. For no reason other than to look pretty! With every second that ticks by, the clock produces a unique wall of colour.

![An example of the clock](images/example-clock.png)

## What exactly does it do?

There are 6 bars, representing years, months, days, hours, minutes and seconds. The colour at the top of each bar represents how far through we are. For example, the year 2021 is 21% of the way through the century. 21% turns out to be a yellowy-green.

To get a nice gradient effect, the years bar merges into the months colour. The months bar merges into the days colour, and so on. The seconds bar merges back into the years colour.

There is no real reason for this; it was chosen quite arbitrarily just because it creates some nice effects.

## What exactly do the colours mean?

The colours map to a fully saturated colour wheel of hues of light, where 0 and 100 both mean red (`#FF0000`), 33% is green (`#00FF00`) and 66% is blue (`#0000FF`).

![Colour wheel](images/colour-wheel.png)

I think the only time all the bars will be exactly the same colour will be at the turn of the next century, 1st January 2100, when everything will be red.

![Red time](images/red-time.png)

## How does it know the date and time?

The date and time are localised to you, and are taken from your device. All the calculations are done locally on your device, which is why you won't see the same time as someone else in a different timezone.

## Why does it display the date and time differently?

The date and time are displayed on the screen in your preferred format according to your device. For me in Denmark, I see the date and time like this:

    30.1.2021
    20.27.56

Someone in the UK would likely see the same date and time displayed like this:

    30/01/2021
    20:27:56

Whilst someone in the USA would probably see it like this:

    1/30/2021
    8:27:56 PM

This is simply using the preferred settings of your device.

## Can I set the clock to a specific date and time?

Yes, you can, with an override parameter in the format

    ?d=DD-Mmm-YYYY&t=HH:MM:SS

In the time format, the seconds are optional.

For example, the moment of the assassination of John F. Kennedy - 22nd November 1963 at 12:30 PM - is found at the following URL:

[sermoa.github.io/clock/?d=22-Nov-1963&t=12:30](https://sermoa.github.io/clock/?d=22-Nov-1963&t=12:30)

![Assassination of JFK](images/assassination-of-jfk.png)

Another famous date is the Armistice agreement marking the end of the First World War - the 11th hour of the 11th day of the 11th month, 1918. This can be seen at the following URL:

[sermoa.github.io/clock/?d=11-Nov-1918&t=11:00](https://sermoa.github.io/clock/?d=11-Nov-1918&t=11:00)

![Armistice agreement](images/armistice-agreement.png)

If you see "Invalid Date" and white bars, it either means you got the format wrong, or it just isn't supported on your device. Sorry. Try a different browser.

## When will the colours be a rainbow?

I'm so glad you asked! I wondered this too! I think the 5th February 2099 at 15:31:44 will make a rather nice rainbow!

[sermoa.github.io/clock/?d=5-Feb-2099&t=15:31:44](https://sermoa.github.io/clock/?d=5-Feb-2099&t=15:31:44)

![Rainbow time](images/rainbow-time.png)

## Can I have an analogue clock?

Yes, you can! Simply add a `style=analogue` parameter. The hands will change colour to reflect their position on the colour wheel. All the other parameters will also work in conjunction with an analogue clock.

[sermoa.github.io/clock/?style=analogue](https://sermoa.github.io/clock/?style=analogue)

![Analogue clock](images/analogue-clock.png)

## But what if I don't want a clock at all?

I got you! What you need is `style=minimal`. That'll just give you the six bars and no clock overlay at all. This looks great in fullscreen!

[sermoa.github.io/clock/?style=minimal](https://sermoa.github.io/clock/?style=minimal)

![Minimal mode](images/minimal-mode.png)

## Callout to another URL

You may want to callout to another URL, which can be particularly fun if you have smart lights you want to control with colours of the clock.

Send a `callout` parameter with the URL you wish to call, for example:

[sermoa.github.io/clock/?callout=http://localhost:9000/clock](https://sermoa.github.io/clock/?callout=http://localhost:9000/clock)

This URL must be accessible from your network and accept cross-origin calls.

Every 2 seconds, the clock will send a `PUT` request to the URL with data about the time and colours, which will look something like this:

    {
      "years": {
        "value": 2021.080249278176,
        "percentage": 0.21080249278176003,
        "rgb": "rgb(187, 255, 0)"
      },
      "months": {
        "value": 0.9629913381123059,
        "percentage": 0.0802492781760255,
        "rgb": "rgb(255, 123, 0)"
      },
      "days": {
        "value": 29.85273148148148,
        "percentage": 0.9629913381123059,
        "rgb": "rgb(255, 0, 57)"
      },
      "hours": {
        "value": 20.465555555555557,
        "percentage": 0.7054629629629631,
        "rgb": "rgb(59, 0, 255)"
      },
      "minutes": {
        "value": 27.933333333333334,
        "percentage": 0.46555555555555556,
        "rgb": "rgb(0, 255, 202)"
      },
      "seconds": {
        "value": 56,
        "percentage": 0.9333333333333333,
        "rgb": "rgb(255, 0, 102)"
      }
    }

What you do with this data is entirely up to you. I have it updating my Philips Hue lights. At some point I might share the code for a web server that will help you to do this.

## Can I copy this?

Sure, take it, do what you want with it. It's free, open source, MIT Licensed. I offer no support and make no promises about its quality; it is just something I threw together for fun in a couple of hours. If you make changes, feel free to send me a pull request.

## Credits

- Huge thanks to [Thomas Preece](https://github.com/tepreece) for making the colours change smoothly!
- Also a massive thank you to [Thomas Preece](https://github.com/tepreece) for the brilliant techniqe of a dynamically updating favicon!
- Thank you to Tanya-Jayne Park for requesting an analogue version of the clock.
