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
