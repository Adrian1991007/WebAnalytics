// material-ui
import { Grid } from '@mui/material';

// project import
import AnalyticsDataCard from 'components/cards/statistics/AnalyticsDataCard';
import WelcomeBanner from 'sections/dashboard/WelcomeBanner';
import PageViews from 'sections/dashboard/PageViews';
import UsersCardChart from 'sections/dashboard/UsersCardChart';

// ==============================|| DASHBOARD - ANALYTICS ||============================== //

const DashboardAnalytics = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={3}>
      <Grid item xs={12}>
        <WelcomeBanner />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticsDataCard title="Total Users" count="78,250" percentage={70.5}>
          <UsersCardChart />
        </AnalyticsDataCard>
      </Grid>
      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      <Grid item xs={12} md={5} lg={4}>
        <PageViews />
      </Grid>
    </Grid>
  );
};

export default DashboardAnalytics;
