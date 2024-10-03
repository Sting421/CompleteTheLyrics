/* eslint-disable react/prop-types */
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';

const singerColors = ["#EF476F", "#F78C6B", "#FFD166", "#06D6A0"];

const Item = styled(Paper)(({ theme, bgcolor }) => ({
    backgroundColor: bgcolor || '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    height: 80,
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    margin: '0 10px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none',
    borderRadius: '8px'
}));

export default function Lyrics() {
    const [selectedSinger, setSelectedSinger] = React.useState(null);
    const [lyrics, setLyrics] = React.useState("");
    const [allLyrics, setAllLyrics] = React.useState([]); 
    const singers = [
        { name: "First Singer", path: "/singer/first", color: singerColors[0] },
        { name: "Second Singer", path: "/singer/second", color: singerColors[1] },
        { name: "Third Singer", path: "/singer/third", color: singerColors[2] },
        { name: "Fourth Singer", path: "/singer/fourth", color: singerColors[3] }
    ];

    React.useEffect(() => {
        setSelectedSinger(singers[0]);
    }, []);

    const handleSingerClick = (singer) => {
        if (selectedSinger && lyrics) {
            handleLyricsAutoSubmit();
        }
        setSelectedSinger(singer);
        setLyrics("");
    };

    const handleLyricsAutoSubmit = () => {
        if (lyrics) {
            setAllLyrics(prev => [
                ...prev,
                { text: lyrics, singer: selectedSinger.name, color: selectedSinger.color }
            ]);
            setLyrics(""); // Clear the input after submitting lyrics
        }
    };

    return (
        <Router>
            <Box sx={{ textAlign: 'center', padding: '20px 0', fontSize: '28px', fontWeight: 'bold', marginLeft: '200px' }}>
                Complete the Lyrics
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', marginLeft: '200px' }}>
                <Grid container spacing={1} columns={12} justifyContent="center">
                    {singers.map((singer, index) => (
                        <Grid item key={index}>
                            <Link to={singer.path} style={{ textDecoration: 'none' }} onClick={() => handleSingerClick(singer)}>
                                <Item bgcolor={singer.color}>{singer.name}</Item>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Routes>
                {singers.map((singer) => (
                    <Route
                        key={singer.path}
                        path={singer.path}
                        element={<SingerPage singer={singer.name} lyrics={lyrics} setLyrics={setLyrics} selectedSinger={selectedSinger} />}
                    />
                ))}
            </Routes>
            <Box sx={{ marginLeft: '200px', paddingTop: '20px' }}>
                <h3>Lyrics History</h3>
                <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', padding: 2, maxHeight: '200px', overflowY: 'auto' }}>
                    {/* Display all stored lyrics together */}
                    {allLyrics.map((lyric, index) => (
                        <Box key={index} sx={{ backgroundColor: lyric.color, padding: '8px', margin: '4px 0', borderRadius: '4px', color: 'white' }}>
                            {lyric.text}
                        </Box>
                    ))}
                    {/* Display current lyrics in real-time */}
                    {lyrics && selectedSinger && (
                        <Box
                            sx={{
                                backgroundColor: selectedSinger.color,
                                padding: '8px',
                                margin: '4px 0',
                                borderRadius: '4px',
                                color: 'white'
                            }}
                        >
                            {lyrics}
                        </Box>
                    )}
                </Box>
            </Box>
        </Router>
    );
}

function SingerPage({ singer, lyrics, setLyrics, selectedSinger }) {
    const isVisible = selectedSinger && selectedSinger.name === singer;
    return (
        <Box sx={{ padding: 3, marginLeft: '200px', backgroundColor: 'white', borderRadius: '8px', boxShadow: 1 }}>
            <h2>{singer}</h2>
            {isVisible && (
                <>

                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Enter Lyrics"
                                    multiline
                                    value={lyrics}
                                    onChange={(e) => setLyrics(e.target.value)}
                                    maxRows={40}
                                    size='small'
                                    sx={{ width: '700px' }}  
                                />
                   
                </>
            )}
        </Box>
    );
}