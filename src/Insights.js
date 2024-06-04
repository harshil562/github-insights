import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './App.css';

const Insights = () => {
    const [data, setData] = useState(null);
    const [newDataAvailable, setNewDataAvailable] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState('Repo-1');
    const [prCommentsData, setPrCommentsData] = useState([]);
    const latestDataRef = useRef(null);

    const mockRepos = [
        'Repo-1',
        'Repo-2',
        'Repo-3',
        'Repo-4',
        'Repo-5',
    ];

    const mockPrCommentsData = {
        'Repo-1': [
            { pr: 'PR #1', accepted: 10, total: 15 },
            { pr: 'PR #2', accepted: 7, total: 10 },
            { pr: 'PR #3', accepted: 5, total: 7 },
            { pr: 'PR #4', accepted: 12, total: 20 },
            { pr: 'PR #5', accepted: 8, total: 12 },
        ],
        'Repo-2': [
            { pr: 'PR #1', accepted: 8, total: 12 },
            { pr: 'PR #2', accepted: 6, total: 9 },
            { pr: 'PR #3', accepted: 9, total: 10 },
            { pr: 'PR #4', accepted: 15, total: 20 },
            { pr: 'PR #5', accepted: 4, total: 5 },
        ],
        'Repo-3': [
            { pr: 'PR #1', accepted: 12, total: 15 },
            { pr: 'PR #2', accepted: 10, total: 12 },
            { pr: 'PR #3', accepted: 5, total: 8 },
            { pr: 'PR #4', accepted: 7, total: 9 },
            { pr: 'PR #5', accepted: 13, total: 15 },
        ],
        'Repo-4': [
            { pr: 'PR #1', accepted: 9, total: 13 },
            { pr: 'PR #2', accepted: 11, total: 14 },
            { pr: 'PR #3', accepted: 14, total: 18 },
            { pr: 'PR #4', accepted: 6, total: 9 },
            { pr: 'PR #5', accepted: 7, total: 11 },
        ],
        'Repo-5': [
            { pr: 'PR #1', accepted: 10, total: 11 },
            { pr: 'PR #2', accepted: 12, total: 13 },
            { pr: 'PR #3', accepted: 8, total: 10 },
            { pr: 'PR #4', accepted: 11, total: 14 },
            { pr: 'PR #5', accepted: 9, total: 12 },
        ],
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/data');
            if (!latestDataRef.current) {
                setData(response.data);
                latestDataRef.current = response.data;
            } else if (JSON.stringify(response.data) !== JSON.stringify(latestDataRef.current)) {
                latestDataRef.current = response.data;
                setNewDataAvailable(true);
            }
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 10000); // Check for new data every 10 seconds
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setPrCommentsData(mockPrCommentsData[selectedRepo] || []);
    }, [selectedRepo]);

    const handleRefresh = () => {
        setData(latestDataRef.current);
        setNewDataAvailable(false);
    };

    const handleRepoChange = (event) => {
        const selectedRepo = event.target.value;
        setSelectedRepo(selectedRepo);
        setPrCommentsData(mockPrCommentsData[selectedRepo] || []);
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    const {
        prName,
        prLink,
        codeInsights,
        commentInsights,
        reactionInsights,
        commitInsights,
        businessInsights,
        approximateReviewTime
    } = data;

    const removeHighchartsLabel = {
        exporting: { enabled: false },
        credits: { enabled: false }
    };

    const codeAnalysisOptions = {
        ...removeHighchartsLabel,
        chart: {
            type: 'column'
        },
        title: {
            text: 'Code Analysis'
        },
        xAxis: {
            categories: ['Lines Added', 'Lines Deleted', 'Code Churn', 'Files Changed', 'Methods Added', 'Methods Deleted']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Count'
            }
        },
        series: [{
            name: 'Code Analysis',
            data: [codeInsights.linesAdded, codeInsights.linesDeleted, codeInsights.codeChurn, codeInsights.numFilesChanged, codeInsights.numMethodsAdded, codeInsights.numMethodsDeleted],
            colorByPoint: true
        }]
    };

    const commentAnalysisOptions = {
        ...removeHighchartsLabel,
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Comment Analysis'
        },
        series: [{
            name: 'Comments',
            data: [
                { name: 'Positive Comments', y: commentInsights.positiveComments },
                { name: 'Negative Comments', y: commentInsights.negativeComments },
                { name: 'Neutral Comments', y: commentInsights.neutralComments }
            ]
        }]
    };

    const reactionAnalysisOptions = {
        ...removeHighchartsLabel,
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Reaction Analysis'
        },
        xAxis: {
            categories: ['Thumbs Up', 'Thumbs Down', 'Laughs', 'Hoorays', 'Confused', 'Hearts', 'Rockets', 'Eyes']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Count'
            }
        },
        series: [{
            name: 'Reactions',
            data: [reactionInsights.thumbsUp, reactionInsights.thumbsDown, reactionInsights.laughs, reactionInsights.hoorays, reactionInsights.confused, reactionInsights.hearts, reactionInsights.rockets, reactionInsights.eyes],
            colorByPoint: true
        }]
    };

    const commitAnalysisOptions = {
        ...removeHighchartsLabel,
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Commit Analysis'
        },
        xAxis: {
            categories: ['Total Commits', 'Avg Commit Message Length', 'Commit Frequency', 'Significant Changes']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Count'
            }
        },
        series: [{
            name: 'Commits',
            data: [commitInsights.totalCommits, commitInsights.avgCommitMessageLength, commitInsights.commitFrequency, commitInsights.significantChanges],
            colorByPoint: true
        }]
    };

    const businessInsightsOptions = {
        ...removeHighchartsLabel,
        chart: {
            type: 'area'
        },
        title: {
            text: 'Business Insights'
        },
        xAxis: {
            categories: ['Community Engagement', 'Overall Sentiment', 'Development Efficiency', 'Significant Changes Impact']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Value'
            }
        },
        series: [{
            name: 'Business Insights',
            data: [
                businessInsights.communityEngagement === 'High' ? 3 : businessInsights.communityEngagement === 'Medium' ? 2 : 1,
                businessInsights.overallSentiment === 'Positive' ? 3 : businessInsights.overallSentiment === 'Neutral' ? 2 : 1,
                businessInsights.developmentEfficiency === 'High' ? 3 : businessInsights.developmentEfficiency === 'Average' ? 2 : 1,
                businessInsights.significantChangesImpact === 'High' ? 3 : businessInsights.significantChangesImpact === 'Medium' ? 2 : 1
            ],
            colorByPoint: true
        }]
    };

    const prCommentsOptions = {
        ...removeHighchartsLabel,
        chart: {
            type: 'column'
        },
        title: {
            text: 'Quality of AI reviews'
        },
        xAxis: {
            categories: prCommentsData.map(item => item.pr)
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Count'
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                grouping: true,
            }
        },
        series: [{
            name: 'Accepted Comments',
            data: prCommentsData.map(item => item.accepted),
            stack: 'accepted',
            color: '#007bff'
        }, {
            name: 'Total Comments',
            data: prCommentsData.map(item => item.total),
            stack: 'remaining',
            color: '#ff7373'
        }]
    };

    return (
        <div>
            {newDataAvailable && (
                <button className="refresh-button" onClick={handleRefresh}>
                    Refresh for latest insights
                </button>
            )}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 0, marginBottom: 0 }}>
                <h1 className="pr-title" style={{ paddingLeft: 10 }}>
                    <a href={prLink} target="_blank" rel="noopener noreferrer">{prName} Analysis</a>
                </h1>
                <div className="review-time-widget" style={{ marginRight: 20 }}>
                    <h3>Approximate Review Time</h3>
                    <p>{approximateReviewTime ? `${approximateReviewTime.toFixed(2) > 20 ? (approximateReviewTime - 15).toFixed(0) : approximateReviewTime.toFixed(0)} minutes` : 'Calculating...'}</p>
                </div>
            </div>
            <div>
                <label htmlFor="repo-select" style={{ paddingLeft: 20, paddingRight: 10 }}>Select Repository:</label>
                <select id="repo-select" value={selectedRepo} onChange={handleRepoChange}>
                    {mockRepos.map(repo => (
                        <option key={repo} value={repo}>{repo}</option>
                    ))}
                </select>
                <div className="chart-item">
                    <HighchartsReact highcharts={Highcharts} options={prCommentsOptions} />
                </div>
            </div>
            <div className="chart-grid">
                <div className="chart-item">
                    <HighchartsReact highcharts={Highcharts} options={codeAnalysisOptions} />
                </div>
                <div className="chart-item">
                    <HighchartsReact highcharts={Highcharts} options={commentAnalysisOptions} />
                </div>
                <div className="chart-item">
                    <HighchartsReact highcharts={Highcharts} options={reactionAnalysisOptions} />
                </div>
                <div className="chart-item">
                    <HighchartsReact highcharts={Highcharts} options={commitAnalysisOptions} />
                </div>
                <div className="chart-item">
                    <HighchartsReact highcharts={Highcharts} options={businessInsightsOptions} />
                </div>
            </div>
        </div >
    );
};

export default Insights;
