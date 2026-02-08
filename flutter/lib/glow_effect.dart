import 'dart:async';
import 'dart:math';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';

class GlowEffect extends StatefulWidget {
  const GlowEffect({super.key});

  @override
  State<GlowEffect> createState() => _GlowEffectState();
}

class _GlowEffectState extends State<GlowEffect> with TickerProviderStateMixin {
  late List<GradientStop> gradientStops;
  late Timer _timer;

  @override
  void initState() {
    super.initState();
    gradientStops = _generateGradientStops();
    // In Flutter, we can animate between gradients using a Tween.
    // Updating state periodically.
    _timer = Timer.periodic(const Duration(milliseconds: 400), (timer) {
      if (mounted) {
        setState(() {
          gradientStops = _generateGradientStops();
        });
      }
    });
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  static List<Color> get colors => [
        const Color(0xFFBC82F3),
        const Color(0xFFF5B9EA),
        const Color(0xFF8D9FFF),
        const Color(0xFFFF6778),
        const Color(0xFFFFBA71),
        const Color(0xFFC686FF),
      ];

  List<GradientStop> _generateGradientStops() {
    final random = Random();
    // Each color gets a random location, then we sort by location.
    // This ensures colors shuffle their order around the circle.
    final stops = List.generate(6, (index) {
      return GradientStop(colors[index], random.nextDouble());
    });
    
    stops.sort((a, b) => a.location.compareTo(b.location));
    return stops;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // EffectNoBlur
          EffectLayer(
            stops: gradientStops,
            width: 6,
            blur: 0,
            duration: const Duration(milliseconds: 500),
          ),
          // Effect 1
          EffectLayer(
            stops: gradientStops,
            width: 9,
            blur: 4,
            duration: const Duration(milliseconds: 600),
          ),
          // Effect 2
          EffectLayer(
            stops: gradientStops,
            width: 11,
            blur: 12,
            duration: const Duration(milliseconds: 800),
          ),
          // Effect 3
          EffectLayer(
            stops: gradientStops,
            width: 15,
            blur: 15,
            duration: const Duration(milliseconds: 1000),
          ),
          
          const Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  "Apple Intelligence",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  "Glow Animation",
                  style: TextStyle(
                    color: Colors.white60,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}

class GradientStop {
  final Color color;
  final double location;

  GradientStop(this.color, this.location);
}

class EffectLayer extends StatelessWidget {
  final List<GradientStop> stops;
  final double width;
  final double blur;
  final Duration duration;

  const EffectLayer({
    super.key,
    required this.stops,
    required this.width,
    required this.blur,
    required this.duration,
  });

  @override
  Widget build(BuildContext context) {
    // We use TweenAnimationBuilder to animate the gradient properties if possible.
    // However, SweepGradient takes a list of colors and stops.
    // Animating the list of stops is what we want.
    
    return TweenAnimationBuilder<List<GradientStop>>(
      tween: GradientStopListTween(begin: stops, end: stops),
      duration: duration,
      curve: Curves.easeInOut,
      builder: (context, animatedStops, child) {
        return Positioned.fill(
          child: CustomPaint(
            painter: GlowPainter(
              stops: animatedStops,
              width: width,
              blur: blur,
            ),
          ),
        );
      },
    )
  }
}

class GradientStopListTween extends Tween<List<GradientStop>> {
  GradientStopListTween({super.begin, super.end});

  @override
  List<GradientStop> lerp(double t) {
    if (begin == null || end == null) return end ?? [];
    if (begin!.length != end!.length) return end!;

    return List.generate(begin!.length, (index) {
      final b = begin![index];
      final e = end![index];
      return GradientStop(
        Color.lerp(b.color, e.color, t)!,
        ui.lerpDouble(b.location, e.location, t)!,
      );
    });
  }
}

class GlowPainter extends CustomPainter {
  final List<GradientStop> stops;
  final double width;
  final double blur;

  GlowPainter({
    required this.stops,
    required this.width,
    required this.blur,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Offset.zero & size;
    // Swift uses RoundedRectangle with cornerRadius 55.
    // And strokeBorder...
    // In Flutter, we can draw a RRect with style stroke.
    
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = width;

    if (blur > 0) {
      paint.maskFilter = MaskFilter.blur(BlurStyle.normal, blur);
    }

    // Creating SweepGradient
    // SweepGradient in Flutter by default starts at 3 o'clock (0 radians) or 9 o'clock? 
    // Usually 0 is right. CSS conic starts at top (12 o'clock).
    // Use transform to rotate if needed.
    
    final gradient = SweepGradient(
      center: Alignment.center,
      startAngle: 0.0,
      endAngle: pi * 2,
      colors: stops.map((s) => s.color).toList(),
      stops: stops.map((s) => s.location).toList(), // Stops need to be sorted 0..1
      // Swift code sorts them. Our logic ensures locations are sorted.
      // But SweepGradient requires strictly increasing stops? Usually yes.
    );

    paint.shader = gradient.createShader(rect);

    // Padding top -26 or -17 in Swift implies offsetting the shape?
    // We will just Center it or fill.
    // The Swift code frames it to UIScreen width/height.
    
    final rrect = RRect.fromRectAndRadius(
      Rect.fromCenter(
        center: rect.center,
        width: rect.width - width, 
        height: rect.height - width,
      ),
      const Radius.circular(55),
    );

    canvas.drawRRect(rrect, paint);
  }

  @override
  bool shouldRepaint(covariant GlowPainter oldDelegate) {
    return oldDelegate.stops != stops ||
           oldDelegate.width != width ||
           oldDelegate.blur != blur;
  }
}

//Rest customise it according to your use case.
