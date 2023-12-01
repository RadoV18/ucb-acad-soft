FROM --platform=linux/x86_64 mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80

COPY ./out ./
COPY .env ./
ENTRYPOINT ["dotnet", "Backend.dll"]

