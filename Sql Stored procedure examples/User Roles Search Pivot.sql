USE [C64]
GO

/****** Object:  StoredProcedure [dbo].[user_roles_search]    Script Date: 2/8/2019 1:36:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[user_roles_search]
	@UserId INT = null,
	@SearchTerm NVARCHAR(255) = null,
	@pageSize INT = 1,
	@pageNumber INT = 1
AS
/*
	DECLARE
		@_userid INT = '',
		@_searchterm NVARCHAR(255) = 'test',
		@_pageSize INT = 10,
		@_pageNumber INT = 1
	EXEC user_roles_search
		@_userid,
		@_searchterm,
		@_pageSize,
		@_pageNumber
*/
/*
	DECLARE
		@_userid INT = 144
	EXEC user_roles_search
		@_userid

*/
BEGIN 
	SELECT 
	UserId,
	FirstName,
	LastName,
	Email,
	sum(ISNULL([SuperAdmin], 0)) AS [SuperAdmin],
	sum(ISNULL([Implementer], 0)) AS [Implementer],
	sum(ISNULL([FundingSourceAdmin], 0)) AS [FundingSourceAdmin],
	sum(ISNULL([SchoolNgoAdmin], 0)) AS [SchoolNgoAdmin],
	sum(ISNULL([FundingSourceDirector], 0)) AS [FundingSourceDirector],
	sum(ISNULL([SchoolNgoDirector], 0)) AS [SchoolNgoDirector],
	sum(ISNULL([FundingSourceCaseManager], 0)) AS [FundingSourceCaseManager],
	sum(ISNULL([SchoolNgoCaseManager], 0)) AS [SchoolNgoCaseManager],
	sum(ISNULL([StudentClient], 0)) AS [StudentClient]
	FROM
	
	(SELECT
		ur.UserId as Id,
		u.Id as UserId,
		p.FirstName,
		p.LastName,
		u.Email,
		ur.RoleId,
		r.RoleName
		
	FROM	
		users as u
	LEFT JOIN
		person as p
	ON
		u.Id = p.UserId
	LEFT JOIN
		user_roles as ur
	ON
		u.Id = ur.UserId
	LEFT JOIN
		roles as r
	ON
		r.Id = ur.RoleId
	
	WHERE
		u.Id = @UserId
		OR
		u.Email LIKE ('%' + @SearchTerm + '%')
			OR
			p.FirstName LIKE ('%' + @SearchTerm + '%')
			OR
			p.LastName LIKE ('%' + @SearchTerm + '%')) AS SourceTable
			
	PIVOT (
		COUNT(Id) 
		FOR RoleName  in ([SuperAdmin],[Implementer],[FundingSourceAdmin],[SchoolNgoAdmin],[FundingSourceDirector],[SchoolNgoDirector],[FundingSourceCaseManager],[SchoolNgoCaseManager],[StudentClient] ) 
	) AS PivotTable 

	GROUP BY PivotTable.UserId, PivotTable.FirstName, PivotTable.LastName, PivotTable.Email

	ORDER BY UserId
	OFFSET @pageSize * (@pageNumber - 1) ROWS 
	FETCH NEXT @pageSize ROWS ONLY;
		
END
GO

