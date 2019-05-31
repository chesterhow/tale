---
layout: post
title: "Refactoring a Legacy Flutter App - Part 1"
---

This is the first post in a series where we'll attempt to safely and gradually refactor a legacy app written in Flutter.

If you don't know what Flutter is, check out the [awesome 2-part episode](https://fragmentedpodcast.com/episodes/118/) of the Fragmented podcast or this [Google I/O presentation](https://www.youtube.com/watch?v=w2TcYP8qiRI).

If you do know what Flutter is and are wondering: *"how can there be any legacy code in Flutter? It's not old enough for that"*. The answer is in [Michael Feather's definition](https://www.techdoneright.io/11). He defends the idea that legacy code is not necessarily old code, but code without automated tests.

# The Goal
Here's what we'll do: we will cover the app with automated tests, so that we have a safety net in case we make mistakes, and then we'll refactor the code and apply the MVP architectural pattern.

## The App
![the app](https://cdn-images-1.medium.com/max/1600/1*gPfZYLOXsYomE332DifeLw.png "the app")
The app we're going to refactor is the [beautiful Planets app](https://sergiandreplace.com/planets-flutter-from-design-to-app/) created by Sergi Martínez. This app is nice because it looks great, Sergi has a [whole series](https://sergiandreplace.com//tags/planets/) showing how he built it and he focused solely on the UI part.

This means we have a cool, working app with lots of room for improvement in terms of architecture. If you were building a prototype and had to move fast (like in a startup) this is probably how you would've done it.

You can see this series as the natural next step. You've built a prototype and validated your idea. Now it's time to make it production-ready.

## The Code
To get started, checkout the code from the [Github repo](https://github.com/lucasmbraz/planets). And if you want to jump straight to the solution, take a look at the [part-1 branch](https://github.com/lucasmbraz/planets/tree/part-1).

## Unit Tests vs Widget Tests
According to the [Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html), we should have our applications covered by all types of automated tests, and unit tests should comprise the largest part of our test suite.

The issue that often arises when creating unit tests for legacy apps is that the code is usually not testable. This makes writing unit tests very hard and sometimes even impossible.

In order to write unit tests, we might have to change the code. But if we modify the code without tests in place, we take the risk of making mistakes and introducing bugs. (Read Michael Feather's [Working Effective with Legacy Code](https://www.amazon.co.uk/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052/ref=sr_1_1?ie=UTF8&qid=1527285607&sr=8-1&keywords=working+effectively+with+legacy+code) to learn more)

To overcome this problem, we'll start with a higher level test. In Flutter world, this means [widget tests](https://flutter.dev/docs/testing#widget-testing). Once we have these tests in place, we can refactor the code to make it more unit testable.

## Planet Summary
If you take your time to inspect the code, you're gonna see that `PlanetSummary` is used in both pages of our app. In horizontal mode, it's used as the rows of the `HomePage`. While in vertical mode, it's used as the top section of the DetailPage.

Now let's start to test. Create the file `/test/ui/common/planet_summary_widget_test.dart` with the content below.

{% highlight dart %}
import 'package:flutter/material.dart';
import 'package:flutter_planets_tutorial/model/planets.dart';
import 'package:flutter_planets_tutorial/ui/common/plannet_summary.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  //1
  group('PlanetSummary ', () {
    //2
    testWidgets('shows planet in horizontal mode', (WidgetTester tester) async {
      final Planet planet = planets[0];
      //3
      await tester.pumpWidget(new MaterialApp(home: new PlanetSummary(planet)));

      //4
      expectSummaryToShow(planet);
    });

    testWidgets('shows planet in vertical mode', (WidgetTester tester) async {
      final Planet planet = planets[0];
      await tester.pumpWidget(new MaterialApp(home: new PlanetSummary.vertical(planet)));

      expectSummaryToShow(planet);
    });
  });
}

void expectSummaryToShow(Planet planet) {
  //5
  expect(find.text(planet.name), findsOneWidget);
  expect(find.text(planet.location), findsOneWidget);
  expect(find.text(planet.gravity), findsOneWidget);
  expect(find.text(planet.distance), findsOneWidget);
}
{% endhighlight %}

This is what the code does:

1. Group is optional. It can be used to organize the code or, in our case, make it read nice. For instance, you can read *“PlanetSummary shows a planet in horizontal mode”*.
2. We call `testWidgets` to create a widget test.
3. `tester.pumpWidget` instantiates the widget we want to test. Note that we have to wrap it in a `MaterialApp`.
4. We can now make assertions on our widget. As both of our tests perform the same checks, we can abstract it in a method to avoid repetition.
5. Finally, we verify that `PlanetSummary` displays the desired information.

Now run the tests and …

![failed test execution](https://cdn-images-1.medium.com/max/1600/1*aPPVf5fnVp0vUdCrDP_wCg.png "failed test execution")

**Boom!** The tests fail with the message *'2 widgets with text "3.711 m/s"'*. Hooray!!!! We've found a bug.

Let's fix it by changing the following line in the `PlanetSummary` class.

{% highlight dart %}
Widget _planetValue({String value, String image}) {
  return new Container(
    child: new Row(
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
      new Image.asset(image, height: 12.0),
      new Container(width: 8.0),
      // new Text(planet.gravity, style: Style.smallTextStyle),  <---- Remove
      new Text(value, style: Style.smallTextStyle),  // <---- Add
      ]
    ),
  );
}
{% endhighlight %}

Run the tests once more and all of them should pass.

## Image Assertion
Our tests are looking nice. We even caught a bug. But right now we’re only verifying if the text is correct (through `find.text`). What if we want to make sure we’re showing the right planet image?

To do so, create the file `/test/util/finders.dart` like this:

{% highlight dart %}
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

Finder findImage(String imageDesc) {
  return find.byWidgetPredicate((Widget widget) {
    if (widget is Image) {
      if (widget.image is AssetImage) {
        AssetImage assetImage = widget.image;
        return imageDesc == assetImage.assetName;
      }
    }
    return false;
  });
}
{% endhighlight %}

And now we can use this method in our test. Go ahead and change `planet_summary_widget_test.dart`:

{% highlight dart %}
import '../../util/finders.dart';  // <---- Add

// ...

void expectSummaryToShow(Planet planet) {
  expect(find.text(planet.name), findsOneWidget);
  expect(find.text(planet.location), findsOneWidget);
  expect(find.text(planet.gravity), findsOneWidget);
  expect(find.text(planet.distance), findsOneWidget);
  expect(findImage(planet.image), findsOneWidget);  // <---- Add
}
{% endhighlight %}

Run the tests again and they still pass. Cool 😎

## DetailPage
Now, let’s test the details page of our app. Create the file `/test/ui/detail/detail_page_widget_test.dart` and add this content to it.

{% highlight dart %}
import 'package:flutter/material.dart';
import 'package:flutter_planets_tutorial/model/planets.dart';
import 'package:flutter_planets_tutorial/ui/detail/detail_page.dart';
import 'package:flutter_test/flutter_test.dart';

import '../../util/finders.dart';

void main() {
  group('DetailPage ', () {
    testWidgets('shows all details of a planet', (WidgetTester tester) async {
      Planet planet = planets.first;
      await tester.pumpWidget(new MaterialApp(home: new DetailPage(planet)));

      expect(find.text(planet.name), findsOneWidget);
      expect(find.text(planet.location), findsOneWidget);
      expect(find.text(planet.gravity), findsOneWidget);
      expect(find.text(planet.distance), findsOneWidget);
      expect(find.text(planet.description), findsOneWidget);
      expect(findImage(planet.image), findsOneWidget);
      expect(findImage(planet.picture), findsOneWidget);
    });
  });
}
{% endhighlight %}

Run this test and it will fail with the following error:

> Exception: HTTP request failed, statusCode: 400,
https://www.nasa.gov/sites/default/files/thumbnails/image/pia21723-16.jpg

What’s going on here? It turns out the detail page tries to load the background image from the web. By default, any HTTP request sent in a widget test returns immediately with status code 400. As we’re using a `NetworkImage` to load the image, it throws an exception when it receives the 400 status code.

To fix this issue, download the `mock_http_client.dart` and add it to `/test/util`. After that, change `detail_page_widget_test.dart`:

{% highlight dart %}
import 'dart:io';  // <---- Add

// ...

import '../../util/finders.dart';
import '../../util/mock_http_client.dart'; // <---- Add

void main() {
  group('DetailPage ', () {
    testWidgets('shows all details of a planet', (WidgetTester tester) async {
      HttpOverrides.global = TestHttpOverrides(); // <---- Add
      Planet planet = planets.first;
      await tester.pumpWidget(new MaterialApp(home: new DetailPage(planet)));

      // ...
    });
  });
}
{% endhighlight %}

And finally add *mockito* as a dependency in your `pubspec.yaml`:

{% highlight yaml %}
dev_dependencies:
  flutter_test:
    sdk: flutter

  mockito: "^2.2.3" # <---- Add
{% endhighlight %}

## Home Page
The final step in our quest is to test the home page. So go ahead and create the file `/test/ui/home/home_page_widget_test.dart`. Add this to the file:

{% highlight dart %}
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_planets_tutorial/model/planets.dart';
import 'package:flutter_planets_tutorial/ui/home/home_page.dart';
import 'package:flutter_test/flutter_test.dart';

import '../../util/mock_http_client.dart';

void main() {
  group('Home Page ', () {
    testWidgets('shows all the planets', (WidgetTester tester) async {
      await tester.pumpWidget(new MaterialApp(home: new HomePage()));

      //1
      for (Planet planet in planets.sublist(0, 3)) {
        expect(find.text(planet.name), findsOneWidget);
      }
      //2
      await tester.drag(find.byType(CustomScrollView), new Offset(0.0, -312.0));
      //3
      await tester.pump();

      expect(find.text(planets[4].name), findsOneWidget);
    });

    testWidgets('goes to detail page when tapping a planet', (WidgetTester tester) async {
      HttpOverrides.global = TestHttpOverrides();
      await tester.pumpWidget(new MaterialApp(home: new HomePage()));

      await tester.tap(find.text(planets[0].name));
      //4
      await tester.pumpAndSettle();
      //5
      expect(find.text("OVERVIEW"), findsOneWidget);
    });
  });
}
{% endhighlight %}

Here’s what the code does:

1. Loop through the list of planets and verify that the first three planets are visible.
2. Use `tester.drag` to scroll down
3. “Wait” for the scroll action to end
4. “Wait” for the navigation to happen
5. Check that the detail page is displayed.

Run the tests once more and … voilà! Green tests. Our app is now all covered.

## Bonus: Continuous Integration and Code Coverage
Now that we have all these widget tests, it’d be nice to run them often and know how much of the code they cover. That’s where *Travis-CI* and *Coveralls* come in. We can set up the former to build and run the tests on every commit and every night. And we can use the later to find the code coverage.

Thankfully, [Yegor Jbanov](https://medium.com/flutter-io/test-flutter-apps-on-travis-3fd5142ecd8c) and [Marcin Szalek](https://marcinszalek.pl/flutter/integrating-flutter-coveralls/) show this is easily achieved. Simply add the following `.travis.yml` to the root of your project, sign up to *Travis-CI* and *Coveralls*, and point them to your repository. It’s that simple.

{% highlight yaml %}
os:
  - linux
sudo: false
addons:
  apt:
    # Flutter depends on /usr/lib/x86_64-linux-gnu/libstdc++.so.6 version GLIBCXX_3.4.18
    sources:
      - ubuntu-toolchain-r-test # if we don't specify this, the libstdc++6 we get is the wrong version
    packages:
      - libstdc++6
      - fonts-droid
before_script:
  - git clone https://github.com/flutter/flutter.git -b beta
  - ./flutter/bin/flutter doctor
  - gem install coveralls-lcov
script:
  - ./flutter/bin/flutter test --coverage
after_success:
  - coveralls-lcov coverage/lcov.info
cache:
  directories:
    - $HOME/.pub-cache
{% endhighlight %}

You can also add some cool badges to your project. Simply copy the markdown code from *Travis-CI* and *Coveralls* and add them to your `README.md` so it looks like the image below ([here’s mine](https://raw.githubusercontent.com/lucasmbraz/planets/part-1/README.md)).

![CI badges](https://cdn-images-1.medium.com/max/1600/1*bwsDOVJdgcyIkirJtsGoBg.png "CI badges")

<br>
<hr>
<br>

That’s it for now. I hope you have found this useful. In the next post of this series, we’ll refactor the code and apply the MVP pattern. Stay tuned!
