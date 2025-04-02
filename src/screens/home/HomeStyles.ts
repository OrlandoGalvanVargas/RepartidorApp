import { StyleSheet } from 'react-native';

export const createHomeStyles = (width: number) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: width * 0.05, 
  },
  profileSection: {
    alignItems: 'center',
    width: '100%',
    marginBottom: width * 0.08, 
  },
  sectionTitle: {
    fontSize: width * 0.06, 
    fontWeight: 'bold',
    marginBottom: width * 0.03, 
  },
  userIcon: {
    marginBottom: width * 0.03,
  },
  driverLabel: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  driverName: {
    fontSize: width * 0.055,
    marginBottom: width * 0.04,
  },
  vehicleDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: width * 0.04,
  },
  detailItem: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingTop: width * 0.01,
    paddingBottom: width * 0.01,
    paddingHorizontal: width * 0.04,
    minWidth: width * 0.25,
    justifyContent: 'center',
  },
  detailTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: width * 0.045,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    marginVertical: width * 0.02,
  },
  transportSection: {
    alignItems: 'center',
    width: '100%',
  },
  transportImage: {
    width: width * 0.8,
    height: (width * 0.8) / 1.33,
    resizeMode: 'contain',
    marginTop: width * 0.015,
  },
  userPhoto: {
    width: width * 0.27,
    height: width * 0.27,
    borderRadius: width * 0.1,
    marginBottom: width * 0.03,
  },
});