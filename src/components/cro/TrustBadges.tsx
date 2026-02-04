import { Shield, Award, Users, Clock, Star, CheckCircle } from 'lucide-react';

const trustItems = [
  {
    icon: Shield,
    title: 'Insured & Licensed',
    description: 'Fully insured event management company',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Best Catering Service 2024',
  },
  {
    icon: Users,
    title: '500+ Events',
    description: 'Successfully completed events',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round the clock assistance',
  },
  {
    icon: Star,
    title: '4.9 Rating',
    description: 'Based on 500+ reviews',
  },
  {
    icon: CheckCircle,
    title: '100% Satisfaction',
    description: 'Guaranteed client satisfaction',
  },
];

export function TrustBadges({ className = '' }: { className?: string }) {
  return (
    <section className={`py-12 bg-muted/30 ${className}`}>
      <div className="container-custom">
        <div className="text-center mb-8">
          <h3 className="heading-card mb-2">Trusted by Hundreds</h3>
          <p className="text-muted-foreground">Why clients choose Anjani events</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-card transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustBadgesMinimal() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-4">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        <span className="text-sm font-medium">Insured</span>
      </div>
      <div className="flex items-center gap-2">
        <Award className="w-5 h-5 text-primary" />
        <span className="text-sm font-medium">Award Winning</span>
      </div>
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-accent" />
        <span className="text-sm font-medium">4.9 Rating</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-primary" />
        <span className="text-sm font-medium">100% Satisfaction</span>
      </div>
    </div>
  );
}
