import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Lightbulb from '../../images/Lightbulb.jpg'
import Code from '../../images/Code.jpg'

function About() {
    const mediaQuery = useMediaQuery('(min-width:600px)');

    return (
        <Box sx={{ marginTop: 5 }}>
            <Typography
                variant='h1'
                component='div'
                align='center'
                gutterBottom
                fontSize={mediaQuery ? '3rem' : '2rem'}
                sx={{ marginBottom: 5 }}
            >
                About
            </Typography>
            <Grid
                container
                spacing={5}
            >
                <Grid
                    item
                    xs={12}
                    lg={7}
                >
                    <Stack spacing={5}>
                        <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 5px 15px' }}>
                            <CardContent sx={{ margin: 2 }}>
                                <Typography
                                    sx={{ fontWeight: 300, textDecoration: 'underline', textDecorationColor: '#aa00ff', textUnderlineOffset: 3 }}
                                    variant='h2'
                                    component='div'
                                    align='center'
                                    fontSize={mediaQuery ? '2.5rem' : '1.75rem'}
                                >
                                    Get More Done
                                </Typography>
                                <ul>
                                    <li>
                                        <Typography variant='h6' component='div' sx={{ marginLeft: 1 }}>
                                            Add your tasks
                                        </Typography>
                                    </li>
                                    <li sx={{ marginRight: 1 }}>
                                        <Typography variant='h6' component='div' sx={{ marginLeft: 1 }}>
                                            Mark them as complete
                                        </Typography>
                                    </li>
                                    <li sx={{ marginRight: 1 }}>
                                        <Typography variant='h6' component='div' sx={{ marginLeft: 1 }}>
                                            Improve your life
                                        </Typography>
                                    </li>
                                </ul>
                                <Typography variant='p' component='div' sx={{ marginLeft: 3, marginRight: 3 }}>
                                    <span style={{ textDecoration: 'underline', textDecorationColor: '#aa00ff', textUnderlineOffset: 3 }}>toomuchtodo.app</span> is a simple & easy to use web application that helps you keep track of your life.
                                    Simply sign up with your E-Mail and watch your productivity soar.
                                    Best of all, the website is completely free - and no, I don't sell your data.
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 5px 15px' }}>
                            <CardContent sx={{ margin: 2 }}>
                                <Typography
                                    variant='h2'
                                    component='div'
                                    align='center'
                                    sx={{ fontWeight: 300, textDecoration: 'underline', textDecorationColor: '#aa00ff', textUnderlineOffset: 3 }}
                                    fontSize={mediaQuery ? '2.5rem' : '1.75rem'}
                                    gutterBottom
                                >
                                    The Founder
                                </Typography>
                                <Typography variant='p' component='div' sx={{ marginLeft: 3, marginRight: 3 }}>
                                    My name's Daniel and I'm the founder and creator of <span style={{ textDecoration: 'underline', textDecorationColor: '#aa00ff', textUnderlineOffset: 3 }}>toomuchtodo.app</span>!
                                    I graduated from Penn State University at the end of 2019 and took an interest in coding shortly after.
                                    In 2021, I began learning backend web development and started learning React about 6 months before creating this site.
                                    The sole reason for creating this was to practice my full-stack skills and figured I'd put it online for the world to use after finishing.
                                    With that said, I am paying for the server and hosting costs out of pocket - if the website has helped you and you would like to donate, feel free to "buy me a coffee":
                                </Typography>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2rem' }}
                                >
                                    <a
                                        href='https://www.buymeacoffee.com/toomuchtodoapp'
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        <img
                                            src='https://img.buymeacoffee.com/button-api/?text=Support Too Much To Do&emoji=&slug=toomuchtodoapp&button_colour=aa00ff&font_colour=ffffff&font_family=Poppins&outline_colour=ffffff&coffee_colour=FFDD00'
                                            alt='Donate to support Too Much To Do'
                                        />
                                    </a>
                                </div>
                                <Typography variant='p' component='div' sx={{ marginLeft: 3, marginTop: 2 }}>
                                    Some of the technology behind the site:
                                </Typography>
                                <ul>
                                    <li>
                                        <Typography variant='p' component='div' sx={{ marginLeft: 1 }}>
                                            Python Flask
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant='p' component='div' sx={{ marginLeft: 1 }}>
                                            React
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant='p' component='div' sx={{ marginLeft: 1 }}>
                                            Redux-Toolkit
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant='p' component='div' sx={{ marginLeft: 1 }}>
                                            SQL-Alchemy
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant='p' component='div' sx={{ marginLeft: 1 }}>
                                            Firebase
                                        </Typography>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
                <Grid
                    item
                    sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' } }}
                    lg={5}
                >
                    <Stack spacing={5}>
                        <img
                            src={Lightbulb}
                            style={{
                                width: '100%',
                                borderRadius: 4,
                                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 5px 15px'
                            }}
                            alt='Lightbulb'
                        />
                        <img
                            src={Code}
                            style={{
                                width: '100%',
                                borderRadius: 4,
                                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 5px 15px'
                            }}
                            alt='Code'
                        />
                    </Stack>
                </Grid>
            </Grid >
        </Box >
    )
}

export default About