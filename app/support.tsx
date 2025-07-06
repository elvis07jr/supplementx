import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { HelpCircle, MessageCircle, Phone, Mail, ChevronRight, Send, Clock, CheckCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
  expanded: boolean;
};

export default function SupportScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: '1',
      question: 'How do I track my order?',
      answer: 'You can track your order in real-time by going to "My Orders" in your profile. You\'ll receive SMS and push notifications with updates.',
      expanded: false,
    },
    {
      id: '2',
      question: 'What payment methods do you accept?',
      answer: 'We accept M-Pesa, Visa/Mastercard, and bank transfers. M-Pesa is the most popular and fastest payment method in Kenya.',
      expanded: false,
    },
    {
      id: '3',
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 1-3 business days within Nairobi. Express delivery is available within 2-4 hours for urgent orders.',
      expanded: false,
    },
    {
      id: '4',
      question: 'Can I return supplements?',
      answer: 'Yes, unopened supplements can be returned within 30 days of purchase. Please contact support to initiate a return.',
      expanded: false,
    },
    {
      id: '5',
      question: 'Are the supplements authentic?',
      answer: 'All our supplements are sourced directly from authorized distributors and verified for authenticity using blockchain technology.',
      expanded: false,
    },
  ]);

  const toggleFAQ = (id: string) => {
    setFaqs(prev => 
      prev.map(faq => 
        faq.id === id ? { ...faq, expanded: !faq.expanded } : faq
      )
    );
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter your message');
      return;
    }

    Alert.alert(
      'Message Sent',
      'Thank you for contacting us! We\'ll get back to you within 24 hours.',
      [{ text: 'OK', onPress: () => setMessage('') }]
    );
  };

  const handleContactMethod = (method: string) => {
    switch (method) {
      case 'phone':
        Alert.alert('Call Support', 'Would you like to call +254 700 123 456?');
        break;
      case 'email':
        Alert.alert('Email Support', 'Opening email client...');
        break;
      case 'chat':
        Alert.alert('Live Chat', 'Connecting to live chat...');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Help & Support</Text>
          <Text style={styles.subtitle}>We're here to help you 24/7</Text>
        </View>

        {/* Quick Contact Options */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.contactOptions}>
            <Pressable 
              style={styles.contactOption}
              onPress={() => handleContactMethod('chat')}
            >
              <View style={styles.contactIcon}>
                <MessageCircle size={24} color={Colors.light.primary} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Live Chat</Text>
                <Text style={styles.contactSubtitle}>Available 24/7</Text>
              </View>
              <View style={styles.statusBadge}>
                <View style={styles.onlineIndicator} />
                <Text style={styles.statusText}>Online</Text>
              </View>
            </Pressable>

            <Pressable 
              style={styles.contactOption}
              onPress={() => handleContactMethod('phone')}
            >
              <View style={styles.contactIcon}>
                <Phone size={24} color={Colors.light.secondary} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Phone Support</Text>
                <Text style={styles.contactSubtitle}>+254 700 123 456</Text>
              </View>
              <Clock size={16} color={Colors.light.subtext} />
            </Pressable>

            <Pressable 
              style={styles.contactOption}
              onPress={() => handleContactMethod('email')}
            >
              <View style={styles.contactIcon}>
                <Mail size={24} color={Colors.light.primary} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Email Support</Text>
                <Text style={styles.contactSubtitle}>support@supplementx.com</Text>
              </View>
              <Text style={styles.responseTime}>24h response</Text>
            </Pressable>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqList}>
            {faqs.map((faq) => (
              <View key={faq.id} style={styles.faqItem}>
                <Pressable 
                  style={styles.faqQuestion}
                  onPress={() => toggleFAQ(faq.id)}
                >
                  <HelpCircle size={20} color={Colors.light.primary} />
                  <Text style={styles.questionText}>{faq.question}</Text>
                  <ChevronRight 
                    size={20} 
                    color={Colors.light.subtext}
                    style={[
                      styles.chevron,
                      faq.expanded && styles.chevronExpanded
                    ]}
                  />
                </Pressable>
                {faq.expanded && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.answerText}>{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Send Message */}
        <View style={styles.messageSection}>
          <Text style={styles.sectionTitle}>Send us a Message</Text>
          <View style={styles.messageForm}>
            <TextInput
              style={styles.messageInput}
              placeholder="Describe your issue or question..."
              placeholderTextColor={Colors.light.subtext}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <Button
              title="Send Message"
              onPress={handleSendMessage}
              icon={<Send size={16} color="#FFFFFF" />}
              fullWidth
              style={styles.sendButton}
            />
          </View>
        </View>

        {/* Support Hours */}
        <View style={styles.hoursSection}>
          <Text style={styles.hoursTitle}>Support Hours</Text>
          <View style={styles.hoursList}>
            <View style={styles.hoursItem}>
              <Text style={styles.hoursDay}>Monday - Friday</Text>
              <Text style={styles.hoursTime}>8:00 AM - 8:00 PM</Text>
            </View>
            <View style={styles.hoursItem}>
              <Text style={styles.hoursDay}>Saturday</Text>
              <Text style={styles.hoursTime}>9:00 AM - 6:00 PM</Text>
            </View>
            <View style={styles.hoursItem}>
              <Text style={styles.hoursDay}>Sunday</Text>
              <Text style={styles.hoursTime}>10:00 AM - 4:00 PM</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.subtext,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  contactSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  contactOptions: {
    gap: 12,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.light.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  responseTime: {
    fontSize: 12,
    color: Colors.light.subtext,
  },
  faqSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  faqList: {
    gap: 8,
  },
  faqItem: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
    marginLeft: 12,
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 0,
  },
  answerText: {
    fontSize: 14,
    color: Colors.light.subtext,
    lineHeight: 20,
    marginLeft: 32,
  },
  messageSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  messageForm: {
    gap: 16,
  },
  messageInput: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.light.text,
    borderWidth: 1,
    borderColor: Colors.light.border,
    minHeight: 120,
  },
  sendButton: {
    marginTop: 8,
  },
  hoursSection: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 20,
    margin: 16,
    marginBottom: 32,
  },
  hoursTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  hoursList: {
    gap: 12,
  },
  hoursItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hoursDay: {
    fontSize: 14,
    color: Colors.light.text,
  },
  hoursTime: {
    fontSize: 14,
    color: Colors.light.subtext,
    fontWeight: '500',
  },
});