<?php
require_once 'config.php';

$products = [
  ['eq1', 'Professional Power Rack', 'gym', 'Heavy-duty steel frame, 1000lb capacity', 24999, 4.9, 'images/eq1.jpg', '11-gauge steel | 200lbs'],
  ['eq2', 'Dumbbell Set', 'gym', 'Space-saving design with stand', 15999, 4.8, 'images/eq2.jpg', '5-50kg range | Includes stand'],
  ['eq3', 'Olympic Barbell 20kg', 'gym', 'Premium steel, 1500lb capacity', 8999, 4.9, 'images/eq3.jpg', '7.2ft | 190k PSI'],
  ['eq4', 'Weight Plates Set', 'gym', 'Rubber coated bumper plates', 18999, 4.7, 'images/eq4.jpg', 'Rubber coated | Olympic size'],
  ['eq5', 'Adjustable Bench Press', 'gym', '7 positions, 800lb capacity', 12999, 4.8, 'images/eq5.jpg', '7 positions | 800lb capacity'],
  ['eq6', 'Cable Crossover Machine', 'gym', 'Dual pulleys, 200lb stack', 44999, 4.9, 'images/eq6.jpg', '200lb stack | Dual pulleys'],
  ['eq7', 'Resistance Bands Set', 'gym', '5 levels from X-light to XX-heavy', 1999, 4.6, 'images/eq7.jpg', '5-150lbs resistance'],
  ['eq8', 'Pull-up Bar', 'gym', 'Doorway mount, 300lb capacity', 2499, 4.7, 'images/eq8.jpg', '300lb capacity | No-drill'],
  ['eq9', 'Kettlebell Set', 'gym', 'Cast iron, color-coded set', 7999, 4.8, 'images/eq9.jpg', 'Cast iron | Color coded'],
  ['eq10', 'Premium Yoga Mat', 'gym', 'Eco-friendly, non-slip, 8mm', 1499, 4.5, 'images/eq10.jpg', '8mm thick | Non-slip'],
  ['eq11', 'Hex Dumbbell Set', 'gym', 'Rubber hex dumbbells with rack', 24999, 4.9, 'images/eq11.jpg', 'Rubber encased | Includes rack'],
  ['eq12', 'Smith Machine', 'gym', 'Linear bearing system', 39999, 4.9, 'images/eq12.jpg', 'Linear bearings | Safety catches'],
  ['eq13', 'Leg Press Machine', 'gym', 'Heavy-duty leg press', 34999, 4.8, 'images/eq13.jpg', '300lb stack | Heavy-duty'],
  ['eq14', 'Treadmill Premium', 'gym', '3.5HP motor, incline 15%', 45999, 4.9, 'images/eq14.jpg', '3.5HP | 15% incline'],
  ['eq15', 'Exercise Bike', 'gym', 'Magnetic resistance, LCD', 24999, 4.7, 'images/eq15.jpg', 'Magnetic | 300lb capacity'],
  ['eq16', 'Rowing Machine', 'gym', 'Air resistance, folding', 29999, 4.8, 'images/eq16.jpg', 'Air resistance | Folds'],
  ['eq17', 'Medicine Ball Set', 'gym', 'Set of 4 medicine balls', 4999, 4.6, 'images/eq17.jpg', 'Rubber shell | Textured'],
  ['eq18', 'Battle Ropes', 'gym', '40ft battle rope', 3999, 4.7, 'images/eq18.jpg', 'Polyester | 1.5" thick'],
  ['eq19', 'Weighted Vest', 'gym', 'Adjustable weighted vest', 5999, 4.8, 'images/eq19.jpg', 'Adjustable | Mesh'],
  ['eq20', 'Ab Roller Wheel', 'gym', 'Dual wheel ab roller', 899, 4.5, 'images/eq20.jpg', 'Includes knee pad'],
  ['sp1', 'Basketball', 'sports', 'Official size 7, premium leather', 3499, 4.8, 'images/sp1.jpg', 'Premium leather'],
  ['sp2', 'Soccer Ball', 'sports', 'FIFA quality, stitched', 2999, 4.7, 'images/sp2.jpg', 'PU leather | Butyl'],
  ['sp3', 'Badminton Racket', 'sports', 'Lightweight 75g, pro grade', 5999, 4.9, 'images/sp3.jpg', '75g | Carbon fiber'],
  ['sp4', 'Pickleball Paddle Set', 'sports', '2 paddles + 3 balls', 3999, 4.8, 'images/sp4.jpg', 'Graphite surface'],
  ['sp5', 'Boxing Gloves', 'sports', 'Gel padding, premium leather', 3999, 4.8, 'images/sp5.jpg', 'Premium leather | Gel'],
  ['sp6', 'Punching Bag', 'sports', '70lb, heavy-duty chains', 6999, 4.7, 'images/sp6.jpg', 'Synthetic leather'],
  ['sp7', 'Jump Rope', 'sports', 'Ball bearings, adjustable', 899, 4.6, 'images/sp7.jpg', 'Ball bearings'],
  ['sp8', 'Swimming Goggles', 'sports', 'Anti-fog, UV protection', 1499, 4.7, 'images/sp8.jpg', 'Anti-fog | UV'],
  ['sp9', 'Tennis Racket', 'sports', 'Graphite, 300g', 8999, 4.9, 'images/sp9.jpg', 'Graphite | 300g'],
  ['sp10', 'Volleyball', 'sports', 'Soft touch, indoor/outdoor', 2799, 4.6, 'images/sp10.jpg', 'Microfiber'],
  ['sp11', 'Complete Skateboard', 'sports', 'Maple deck, ABEC-7', 4999, 4.7, 'images/sp11.jpg', 'Maple | ABEC-7'],
  ['sp12', 'Inline Roller Skates', 'sports', 'Adjustable size, LED wheels', 7999, 4.5, 'images/sp12.jpg', 'LED wheels'],
  ['sp13', 'Table Tennis Set', 'sports', '2 rackets + 3 balls', 2499, 4.6, 'images/sp13.jpg', 'Includes case'],
  ['sp14', 'Cricket Bat Pro', 'sports', 'English willow', 6999, 4.8, 'images/sp14.jpg', 'English willow'],
  ['sp15', 'Golf Driver Set', 'sports', '460cc, graphite shaft', 15999, 4.8, 'images/sp15.jpg', '460cc | Graphite'],
  ['sp16', 'Baseball Bat', 'sports', 'Aluminum alloy, BBCOR', 3999, 4.7, 'images/sp16.jpg', 'Aluminum | BBCOR'],
  ['sp17', 'Hockey Stick', 'sports', 'Composite, pro flex', 4999, 4.7, 'images/sp17.jpg', 'Composite'],
  ['sp18', 'Archery Set', 'sports', 'Recurve bow with arrows', 8999, 4.8, 'images/sp18.jpg', 'Recurve | Includes arrows'],
  ['sp19', 'Frisbee Disc Golf', 'sports', '3 discs for disc golf', 2499, 4.5, 'images/sp19.jpg', '3 discs | PDGA'],
  ['sp20', 'Kick Scooter', 'sports', 'Foldable, adjustable', 5999, 4.6, 'images/sp20.jpg', 'Foldable | 220lb'],
  ['sup1', 'Whey Protein Isolate', 'supplements', '25g protein, low carb', 3299, 4.9, 'images/sup1.jpg', '25g protein'],
  ['sup2', 'Creatine Monohydrate', 'supplements', 'Micronized, 300g', 1599, 4.8, 'images/sup2.jpg', 'Micronized'],
  ['sup3', 'Pre-Workout Extreme', 'supplements', '300mg caffeine', 2499, 4.7, 'images/sup3.jpg', '300mg caffeine'],
  ['sup4', 'BCAA 2:1:1', 'supplements', 'Instantized, 250g', 1999, 4.6, 'images/sup4.jpg', '2:1:1 ratio'],
  ['sup5', 'Mass Gainer', 'supplements', '1200 calories, 50g protein', 3999, 4.5, 'images/sup5.jpg', '1200 cals'],
  ['sup6', 'Omega-3 Fish Oil', 'supplements', '1000mg EPA/DHA', 1299, 4.8, 'images/sup6.jpg', '1000mg'],
  ['sup7', 'Vitamin D3 5000IU', 'supplements', 'Immune support', 899, 4.7, 'images/sup7.jpg', '5000IU'],
  ['sup8', 'ZMA Night Recovery', 'supplements', 'Deep sleep, recovery', 1499, 4.8, 'images/sup8.jpg', 'ZMA formula'],
  ['sup9', 'Glutamine Powder', 'supplements', 'Recovery support', 1799, 4.7, 'images/sup9.jpg', 'Pure glutamine'],
  ['sup10', 'CLA 1000', 'supplements', 'Conjugated linoleic acid', 1999, 4.6, 'images/sup10.jpg', '1000mg']
];

$stmt = $pdo->prepare("INSERT IGNORE INTO products (id, name, category, description, base_price, rating, image_url, specs) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

foreach ($products as $p) {
    $stmt->execute($p);
}

echo json_encode(['success' => true, 'inserted' => count($products)]);
?>