# Tech Smash As A Service

When there's no other way to express how you feel....

[Try it out here](http://www.techsmash.io)

----

**Step 1** Head on over to [techsmash.io](http://www.techsmash.io)

**Step 2** Upload an image of the thing you love to hate

**Step 3** Enjoy your new GIF


![Facebook](doc/chuckFacebook.gif) &nbsp; ![Sharepoint](doc/chuckSharepoint.gif) &nbsp; ![Netsuite](doc/chuckNetsuite.gif) &nbsp; ![Ubisoft](doc/chuckUbisoft.gif)


## Running locally
```
npm install
npm run build
npm start -- --input "input-overlay.gif" \
             --output "desired/output/file.gif" \
             --scale 1.0 \
             --speed 1.0 \
             -x 10 \
             -y 20
```
