from django.core.management.base import BaseCommand
from store.models import Category, Product, Testimonial, BlogPost


class Command(BaseCommand):
    help = "Seed the store with sample categories, products, testimonials and a blog post."

    def handle(self, *args, **options):
        categories = ['Living Room', 'Bedroom', 'Dining Room', 'Office', 'Outdoor', 'Storage']
        cat_objs = {}
        for name in categories:
            cat, _ = Category.objects.get_or_create(name=name)
            cat_objs[name] = cat
        self.stdout.write(self.style.SUCCESS(f'Categories ready: {", ".join(categories)}'))

        products = [
            ('Savannah Sofa', 'Living Room', 899, 'A deep-seated three-seater in bouclé weave, built for long evenings and lazy Sundays.', True, False),
            ('Matteo Armchair', 'Living Room', 349, 'Compact accent chair with tapered oak legs and a soft curved back.', True, False),
            ('Willow Sideboard', 'Storage', 749, 'Solid oak sideboard with brass hardware, made for a dining room or entryway.', True, False),
            ('Harper Bed Frame', 'Bedroom', 699, 'Low-profile platform bed in walnut veneer with an upholstered headboard.', True, False),
            ('Dario Desk', 'Office', 499, 'A slim writing desk with a single drawer, sized for small home offices.', True, False),
            ('Velora Wardrobe', 'Storage', 799, 'Three-door wardrobe with soft-close hinges and a full-length mirror panel.', True, False),
            ('Luna Lounge Chair', 'Living Room', 299, 'Signature piece: a sculptural chair in warm ash with a wool-blend cushion.', False, True),
            ('Oakridge Dining Table', 'Dining Room', 699, 'Signature piece: an extendable dining table seating six to eight.', False, True),
            ('Nova Coffee Table', 'Living Room', 249, 'Signature piece: a two-tier coffee table with a travertine top.', False, True),
            ('Elysian Bookshelf', 'Storage', 499, 'Signature piece: an open-back ladder bookshelf in solid beech.', False, True),
        ]
        for name, cat_name, price, desc, featured, signature in products:
            Product.objects.get_or_create(
                name=name,
                defaults={
                    'category': cat_objs[cat_name],
                    'price': price,
                    'description': desc,
                    'stock': 12,
                    'is_featured': featured,
                    'is_signature': signature,
                },
            )
        self.stdout.write(self.style.SUCCESS(f'{len(products)} products ready'))

        testimonials = [
            ('Amara O.', "The quality and craftsmanship are beyond what I expected — Anti completely transformed my living room.", 5),
            ('James K.', "Delivery was smooth and the sofa is even comfier than it looked online.", 5),
            ('Ronke A.', "Ordered the dining table and two armchairs — every piece feels built to last.", 5),
        ]
        for cname, quote, rating in testimonials:
            Testimonial.objects.get_or_create(customer_name=cname, defaults={'quote': quote, 'rating': rating})
        self.stdout.write(self.style.SUCCESS(f'{len(testimonials)} testimonials ready'))

        BlogPost.objects.get_or_create(
            title='5 Tips to Style Your Living Room',
            defaults={
                'excerpt': 'Small changes that make a rented or first living room feel considered.',
                'body': (
                    'Start with one anchor piece — a sofa or a rug — and build the room around its tone.\n\n'
                    'Layer at least three light sources instead of relying on one overhead fixture.\n\n'
                    'Leave breathing room: furniture pushed against every wall usually reads smaller, not bigger.'
                ),
            },
        )
        BlogPost.objects.get_or_create(
            title='How to Choose the Perfect Sofa',
            defaults={
                'excerpt': 'Frame, fill and fabric — what actually determines how a sofa holds up.',
                'body': (
                    'A hardwood frame will outlast a softwood or particleboard one by years, not months.\n\n'
                    'High-density foam over a spring or webbed base keeps its shape longer than foam alone.\n\n'
                    'Bouclé and performance weaves resist wear better than plain cotton in daily-use households.'
                ),
            },
        )
        self.stdout.write(self.style.SUCCESS('2 blog posts ready'))
        self.stdout.write(self.style.SUCCESS('Seeding complete.'))
