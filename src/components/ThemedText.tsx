// components/ThemedText.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';

type ThemedTextProps = {
  type?: 'title' | 'subtitle' | 'default' | 'defaultSemiBold';
  style?: any;
  children: React.ReactNode;
};

export function ThemedText({ type = 'default', style, children }: ThemedTextProps) {
  const textStyle = [
    styles.default,
    type === 'title' && styles.title,
    type === 'subtitle' && styles.subtitle,
    type === 'defaultSemiBold' && styles.defaultSemiBold,
    style,
  ];

  return <Text style={textStyle}>{children}</Text>;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: '600',
  },
});