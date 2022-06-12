# Bionycl
Bionycl is a fully-customisable bionic reading extension for Chrome. Access all the configuration via the Bionycl extension "Options".

![image](https://user-images.githubusercontent.com/43980789/173246564-8e105bdf-0091-47b0-a27c-013dac1316b6.png)

## Behaviour options

Bionycl defaults to attempting to apply formatting for bionic reading on whatever page you're on. You can change this in the settings through the "activate automatically" setting. Don't forget to hit Save after.

You can also change how often it polls the page for new content - this is useful on social media sites especially, where the content you want to read isn't loaded all at once. The default is 5 seconds.

![image](https://user-images.githubusercontent.com/43980789/173246577-139e2c75-db62-4724-afd5-1db49c4d3c9a.png)

## Algorithm options

Define the bolding algorithm yourself - the default is shown below which provides a "thin look", but you might want to make it chunkier.

![image](https://user-images.githubusercontent.com/43980789/173246667-28d89dd3-41ca-427f-a795-c4fb535bf030.png)

...versus a more emboldened:

![image](https://user-images.githubusercontent.com/43980789/173246733-f0a04458-6fd5-4cdf-9570-6b1ccf61043d.png)

This can be easily controlled via the Alorithm letters options:

![image](https://user-images.githubusercontent.com/43980789/173246605-ef53228b-2a01-4cda-b894-558db0a1b929.png)

Don't forget to hit Save!

## Bold CSS options

The defined `font-weight` will be applied to the bolded parts of words, unless the page's stylesheet already defines a weight, in which case the weight will be multiplied by the font weight multiplier value. Custom style rules can also be added here.

![image](https://user-images.githubusercontent.com/43980789/173246808-b0859607-27a8-4558-9491-6ec1b0fd55a8.png)

## Paragraph / Outer CSS options

The default is to attempt to mimic "that bionic reading meme - you know the one", with a light gray theme.

![image](https://user-images.githubusercontent.com/43980789/173246946-eaff5b34-76ba-48ef-ab79-c3c24811e03b.png)

It is understandable that this may not be your preference, so you can choose your own values for every aspect of it. You can even make a dark theme which produces this sort of outcome:

![image](https://user-images.githubusercontent.com/43980789/173247130-d706de34-ca3d-4c0b-b474-ac237c5452c9.png)

Tweak to your preferences!

## Site-specific options

If a site you use isn't working with the default Bionycl, you might need to tell Bionycl how to process the page. You can do this via a CSS selector - selectors for Facebook and Twitter are already entered, with more space to add your own site-specific modifications. Multiple domains to match can be added via comma-separation.

![image](https://user-images.githubusercontent.com/43980789/173247168-2f101b37-b69e-4b42-9b13-a9958ea27ad1.png)

To match nothing, add the domain to the `._nothingplease` selector, or add your own dummy selector.

With automatic formatting off, the "Force auto" per-site options allow you to run Bionycl on only specified websites if desired.

The "apply outer" option defines whether to apply the styles from the Paragraph CSS options - this can look strange on some sites but preferable on others. The chosen defaults are simply what I've found to be my personal preference.

"Ignore on demand" means that the CSS selector will be ignored when Bionycl is applied through the page context menu, and the page will be processed as if Bionycl knew nothing about it. This means that you can manually apply Bionycl to sites you've disabled automatic formatting for via the `._nothingplease` selector (if this wasn't the case, the nothingplease selector would match... well, nothing).
