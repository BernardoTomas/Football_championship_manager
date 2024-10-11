const getHomeTeamLbFinished = `
SELECT 
  lb.name,
  lb.totalPoints,
  lb.totalGames,
  lb.totalVictories,
  lb.totalDraws,
  lb.totalLosses,
  lb.goalsFavor,
  lb.goalsOwn,
  lb.goalsBalance,
  ROUND((lb.totalPoints / (lb.totalGames * 3) * 100), 2) AS efficiency 
FROM (
  SELECT
    t.id,
    team_name as name,
    COUNT(*) as totalGames,
    SUM(
      CASE
        WHEN m.home_team_goals > m.away_team_goals THEN 3
        WHEN m.home_team_goals = m.away_team_goals THEN 1
        ELSE 0
      END
    ) AS totalPoints,
    SUM(
        CASE
            WHEN m.home_team_goals > m.away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalVictories,
    SUM(
        CASE
            WHEN m.home_team_goals = m.away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalDraws,
    SUM(
        CASE
            WHEN m.home_team_goals < m.away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalLosses,
    SUM(m.home_team_goals) AS goalsFavor,
    SUM(m.away_team_goals) AS goalsOwn,
    SUM(m.home_team_goals - m.away_team_goals) AS goalsBalance
FROM teams AS t
    INNER JOIN matches AS m ON (t.id = home_team_id)
WHERE
    m.in_progress = 0
GROUP BY
    t.id,
    t.team_name
) AS lb
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;`;

const getAwayTeamLbFinished = `
SELECT 
  lb.name,
  lb.totalPoints,
  lb.totalGames,
  lb.totalVictories,
  lb.totalDraws,
  lb.totalLosses,
  lb.goalsFavor,
  lb.goalsOwn,
  lb.goalsBalance,
  ROUND((lb.totalPoints / (lb.totalGames * 3) * 100), 2) AS efficiency 
FROM (
  SELECT
    t.id,
    team_name as name,
    COUNT(*) as totalGames,
    SUM(
      CASE
        WHEN m.home_team_goals < m.away_team_goals THEN 3
        WHEN m.home_team_goals = m.away_team_goals THEN 1
        ELSE 0
      END
    ) AS totalPoints,
    SUM(
        CASE
            WHEN m.home_team_goals < m.away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalVictories,
    SUM(
        CASE
            WHEN m.home_team_goals = m.away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalDraws,
    SUM(
        CASE
            WHEN m.home_team_goals > m.away_team_goals THEN 1
            ELSE 0
        END
    ) AS totalLosses,
    SUM(m.away_team_goals) AS goalsFavor,
    SUM(m.home_team_goals) AS goalsOwn,
    SUM(m.away_team_goals - m.home_team_goals) AS goalsBalance
FROM teams AS t
    INNER JOIN matches AS m ON (t.id = away_team_id)
WHERE
    m.in_progress = 0
GROUP BY
    t.id,
    t.team_name
) AS lb
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;`;

const getCompleteLbFinished = `SELECT 
    lb.name,
    lb.totalPoints,
    lb.totalGames,
    lb.totalVictories,
    lb.totalDraws,
    lb.totalLosses,
    lb.goalsFavor,
    lb.goalsOwn,
    lb.goalsBalance,
    ROUND(
      (lb.totalPoints / (lb.totalGames * 3) * 100), 
    2) AS efficiency
FROM (
    SELECT
        t.id AS teamID,
        team_name AS name,
        SUM(
            CASE
                WHEN t.id = m.home_team_id OR t.id = m.away_team_id THEN 1
                ELSE 0
            END
        ) AS totalGames,
        SUM(
            CASE
                WHEN t.id = m.home_team_id AND m.home_team_goals > m.away_team_goals THEN 3
                WHEN t.id = m.away_team_id AND m.away_team_goals > m.home_team_goals THEN 3
                WHEN (
                  t.id = m.home_team_id OR t.id = m.away_team_id
                ) AND m.home_team_goals = m.away_team_goals THEN 1
                ELSE 0
            END
        ) AS totalPoints,
        SUM(
            CASE
                WHEN t.id = m.home_team_id AND m.home_team_goals > m.away_team_goals THEN 1
                WHEN t.id = m.away_team_id AND m.away_team_goals > m.home_team_goals THEN 1
                ELSE 0
            END
        ) AS totalVictories,
        SUM(
            CASE
                WHEN (
                  t.id = m.home_team_id OR t.id = m.away_team_id
                ) AND m.home_team_goals = m.away_team_goals THEN 1
                ELSE 0
            END
        ) AS totalDraws,
        SUM(
            CASE
                WHEN t.id = m.home_team_id AND m.home_team_goals < m.away_team_goals THEN 1
                WHEN t.id = m.away_team_id AND m.away_team_goals < m.home_team_goals THEN 1
                ELSE 0
            END
        ) AS totalLosses,
        SUM(
            CASE
                WHEN t.id = m.home_team_id THEN m.home_team_goals
                WHEN t.id = m.away_team_id THEN m.away_team_goals
                ELSE 0
            END
        ) AS goalsFavor,
        SUM(
            CASE
                WHEN t.id = m.home_team_id THEN m.away_team_goals
                WHEN t.id = m.away_team_id THEN m.home_team_goals
                ELSE 0
            END
        ) AS goalsOwn,
        SUM(
            CASE
                WHEN t.id = m.home_team_id THEN m.home_team_goals - m.away_team_goals
                WHEN t.id = m.away_team_id THEN m.away_team_goals - m.home_team_goals
                ELSE 0
            END
        ) AS goalsBalance
    FROM
        teams AS t
    INNER JOIN
        matches AS m ON (t.id = m.home_team_id OR t.id = m.away_team_id)
    WHERE
        m.in_progress = 0
    GROUP BY
        t.id, t.team_name
) AS lb
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;`;

export {
  getHomeTeamLbFinished,
  getAwayTeamLbFinished,
  getCompleteLbFinished,
};
